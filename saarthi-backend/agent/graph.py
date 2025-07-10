# =================================================================
# File: saarthi-backend/agent/graph.py
# =================================================================
# This is the core of the "Robust Orchestrator" agent.
# This version is updated to use the native Groq Python SDK instead of the LangChain integration.

import os
from typing import TypedDict, List
from groq import Groq # Updated import
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

from . import prompts
from . import tools

load_dotenv()

# --- Agent State Definition ---
class AgentState(TypedDict):
    user_query: str
    plan: List[str]
    executed_steps: List[str]
    code: str
    execution_result: dict
    error_message: str
    chat_history: List[str]

# --- LLM and Vector Store Initialization ---
# Instantiate the native Groq client
# The API key is read automatically from the GROQ_API_KEY environment variable
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)
# Using a powerful and versatile model
MODEL_NAME = "llama3-70b-8192"

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load the knowledge base
FAISS_INDEX_PATH = "saarthi_backend/knowledge_base/knowledge_base/faiss_index"
if not os.path.exists(FAISS_INDEX_PATH):
    raise FileNotFoundError(
        "FAISS index not found. Please run 'python knowledge_base/build_kb.py' first."
    )
vectorstore = FAISS.load_local(FAISS_INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
retriever = vectorstore.as_retriever()

# --- Agent Nodes ---

def plan_node(state: AgentState):
    """Generates the initial or revised plan."""
    print("--- (NODE) PLAN ---")
    
    # Format the prompt string directly
    prompt = prompts.PLAN_PROMPT.format(
        user_query=state["user_query"],
        chat_history="\n".join(state["chat_history"])
    )

    # Make the API call using the native Groq client
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model=MODEL_NAME,
    )
    plan_str = chat_completion.choices[0].message.content
    
    plan_list = [step for step in plan_str.split("\n") if step.strip() and step.strip()[0].isdigit()]
    return {"plan": plan_list, "executed_steps": []}

def code_generation_node(state: AgentState):
    """Generates Python code for the next step in the plan."""
    print("--- (NODE) GENERATE CODE ---")
    
    next_step_index = len(state.get("executed_steps", []))
    if next_step_index >= len(state["plan"]):
        return { "code": None }

    current_step = state["plan"][next_step_index]
    retrieved_docs = retriever.invoke(current_step)
    docs_str = "\n\n".join([doc.page_content for doc in retrieved_docs])

    # Format the prompt string directly
    prompt = prompts.CODE_GENERATION_PROMPT.format(
        plan_step=current_step,
        retrieved_docs=docs_str
    )

    # Make the API call using the native Groq client
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model=MODEL_NAME,
    )
    code = chat_completion.choices[0].message.content.strip('`').strip('python').strip()
    
    return {"code": code}

def execute_code_node(state: AgentState):
    """Executes the generated code."""
    print("--- (NODE) EXECUTE CODE ---")
    result = tools.execute_python_code(state["code"])
    
    executed_steps = state.get("executed_steps", [])
    next_step_index = len(executed_steps)
    executed_steps.append(state["plan"][next_step_index])

    return {
        "execution_result": result,
        "error_message": result["stderr"],
        "executed_steps": executed_steps
    }

def error_handler_node(state: AgentState):
    """Handles errors by generating a new plan."""
    print("--- (NODE) HANDLE ERROR ---")

    # Format the prompt string directly
    prompt = prompts.ERROR_HANDLER_PROMPT.format(
        user_query=state["user_query"],
        failed_code=state["code"],
        error_message=state["error_message"]
    )

    # Make the API call using the native Groq client
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model=MODEL_NAME,
    )
    new_plan_str = chat_completion.choices[0].message.content
    
    new_plan_list = [step for step in new_plan_str.split("\n") if step.strip() and step.strip()[0].isdigit()]
    
    return {
        "plan": new_plan_list,
        "executed_steps": [],
        "error_message": "",
        "code": "",
        "execution_result": {}
    }

# --- Conditional Edges ---

def should_continue(state: AgentState):
    """Determines the next step after code execution."""
    if state.get("error_message"):
        print("--- (EDGE) ROUTING TO ERROR HANDLER ---")
        return "handle_error"
    
    executed_count = len(state.get("executed_steps", []))
    plan_length = len(state.get("plan", []))

    if executed_count >= plan_length:
        print("--- (EDGE) ROUTING TO END ---")
        return END
    else:
        print("--- (EDGE) ROUTING TO GENERATE CODE ---")
        return "generate_code"


# --- Build the Graph ---

def get_agent_graph():
    """Builds and returns the LangGraph agent."""
    workflow = StateGraph(AgentState)

    workflow.add_node("plan", plan_node)
    workflow.add_node("generate_code", code_generation_node)
    workflow.add_node("execute_code", execute_code_node)
    workflow.add_node("handle_error", error_handler_node)

    workflow.set_entry_point("plan")

    workflow.add_edge("plan", "generate_code")
    workflow.add_edge("generate_code", "execute_code")
    workflow.add_conditional_edges(
        "execute_code",
        should_continue,
        {
            "handle_error": "handle_error",
            "generate_code": "generate_code",
            END: END
        }
    )
    workflow.add_edge("handle_error", "generate_code")

    app = workflow.compile()
    return app
