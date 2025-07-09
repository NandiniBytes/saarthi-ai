from pydantic import BaseModel
from typing import Optional, List
from sentence_transformers import SentenceTransformer
from langchain.vectorstores import FAISS
import asyncio

# Define AgentState (copied from main.py for type consistency)
class AgentState(BaseModel):
    user_query: str
    plan: Optional[str] = None
    code_to_execute: Optional[str] = None
    execution_result: Optional[dict[str, str]] = None
    error_message: Optional[str] = None
    chat_history: List[dict[str, str]] = []

async def plan_node(state: AgentState) -> AgentState:
    """
    PLAN node: Generates a Chain-of-Thought plan for the user query.
    Uses RAG to retrieve relevant QGIS/GDAL documentation.
    """
    # Load embedding model and vector store
    embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    try:
        vectorstore = FAISS.load_local("faiss_index", embedding_model, allow_dangerous_deserialization=True)
        # Retrieve relevant docs for the query
        docs = vectorstore.similarity_search(state.user_query, k=3)
        context = "\n".join([doc.page_content for doc in docs])
    except Exception as e:
        context = f"Error loading vectorstore: {str(e)}"
    
    # Simulated LLM call with CoT reasoning
    plan = (
        f"Plan for query '{state.user_query}':\n"
        "1. Analyze query for geospatial task requirements.\n"
        "2. Retrieve relevant QGIS/GDAL documentation from knowledge base.\n"
        f"   - Retrieved context: {context[:200]}...\n"  # Truncate for brevity
        "3. Generate executable Python code using PyQGIS/GDAL for task.\n"
        "4. Execute code and validate output.\n"
        "5. Handle potential errors (e.g., CRS mismatch) and revise plan if needed."
    )
    state.plan = plan
    state.chat_history.append({"role": "agent", "content": f"Generated plan: {plan}"})
    return state