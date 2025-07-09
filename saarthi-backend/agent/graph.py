# This is the core of the "Robust Orchestrator" agent.

import os
from typing import TypedDict, List
from langchain_groq import ChatGroq # Changed from OpenAI
from langchain_community.embeddings import HuggingFaceEmbeddings # Changed from OpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
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
# The API key is read automatically from the GROQ_API_KEY environment variable
llm = ChatGroq(temperature=0, model_name="llama3-8b-8192")
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Load the knowledge base
FAISS_INDEX_PATH = "knowledge_base/faiss_index"
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
    prompt = PromptTemplate(
        template=prompts.PLAN_PROMPT,
        input_variables=["user_query", "chat_history"],
    )
    chain = prompt | llm
    plan_str = chain.invoke({
        "user_query": state["user_query"],
        "chat_history": "\n".join(state["chat_history"])
    }).content
    
    plan_list = [step for step in plan_str.split("\n") if step.strip() and step.strip()[0].isdigit()]
    return {"plan": plan_list, "executed_steps": []}

def code_generation_node(state: AgentState):
    """Generates Python code for the next step in the plan."""
    print("--- (NODE) GENERATE CODE ---")
    
    # Get the next step to execute
    next_step_index = len(state.get("executed_steps", []))
    if next_step_index >= len(state["plan"]):
        return { "code": None } # Plan is complete

    current_step = state["plan"][next_step_index]

    # Retrieve relevant docs
    retrieved_docs = retriever.invoke(current_step)
    docs_str = "\n\n".join([doc.page_content for doc in retrieved_docs])

    prompt = PromptTemplate(
        template=prompts.CODE_GENERATION_PROMPT,
        input_variables=["plan_step", "retrieved_docs"],
    )
    chain = prompt | llm
    code = chain.invoke({
        "plan_step": current_step,
        "retrieved_docs": docs_str
    }).content.strip('`').strip('python').strip()
    
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
    prompt = PromptTemplate(
        template=prompts.ERROR_HANDLER_PROMPT,
        input_variables=["user_query", "failed_code", "error_message"],
    )
    chain = prompt | llm
    new_plan_str = chain.invoke({
        "user_query": state["user_query"],
        "failed_code": state["code"],
        "error_message": state["error_message"]
    }).content
    
    new_plan_list = [step for step in new_plan_str.split("\n") if step.strip() and step.strip()[0].isdigit()]
    
    # Reset state for the new plan
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

    # Add nodes
    workflow.add_node("plan", plan_node)
    workflow.add_node("generate_code", code_generation_node)
    workflow.add_node("execute_code", execute_code_node)
    workflow.add_node("handle_error", error_handler_node)

    # Set entry point
    workflow.set_entry_point("plan")

    # Add edges
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

    # Compile the graph
    app = workflow.compile()
    return app
