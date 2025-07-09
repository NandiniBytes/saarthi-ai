from fastapi import FastAPI, WebSocket
from langgraph.graph import StateGraph, END
from pydantic import BaseModel
from typing import Dict, Optional, List
import json
import subprocess
import os
from sentence_transformers import SentenceTransformer
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
import asyncio

# Initialize FastAPI app
app = FastAPI()

# State definition for LangGraph
class AgentState(BaseModel):
    user_query: str
    plan: Optional[str] = None
    code_to_execute: Optional[str] = None
    execution_result: Optional[Dict[str, str]] = None
    error_message: Optional[str] = None
    chat_history: List[Dict[str, str]] = []

# Initialize embedding model and vector store (RAG setup)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
vectorstore = None  # Will be initialized in setup_knowledge_base

def setup_knowledge_base():
    global vectorstore
    # Placeholder for loading documentation (e.g., QGIS, GDAL docs)
    documents = ["Sample QGIS documentation", "Sample GDAL documentation"]  # Replace with actual docs
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_text("\n".join(documents))
    embeddings = embedding_model.encode(chunks)
    vectorstore = FAISS.from_texts(chunks, embedding=embedding_model)
    vectorstore.save_local("faiss_index")

# PLAN Node: Generates a plan using a zero-shot CoT prompt
async def plan_node(state: AgentState) -> AgentState:
    # Simulated LLM call with Chain-of-Thought reasoning
    plan = f"Plan for query '{state.user_query}':\n1. Analyze query for geospatial task.\n2. Retrieve relevant docs from vectorstore.\n3. Generate code for task execution."
    state.plan = plan
    state.chat_history.append({"role": "agent", "content": f"Generated plan: {plan}"})
    return state

# GENERATE_CODE Node: Generates executable Python code
async def generate_code_node(state: AgentState) -> AgentState:
    # Simulated code generation based on plan and query
    if "flood mapping" in state.user_query.lower():
        code = """
import gdal
import qgis.core

# Placeholder: Load DEM, LULC, and soil data
dem = gdal.Open('path_to_dem.tif')
# Perform flood mapping (simplified)
print('Performing flood mapping...')
"""
    else:
        code = "# Placeholder code for other tasks"
    state.code_to_execute = code
    state.chat_history.append({"role": "agent", "content": f"Generated code:\n{code}"})
    return state

# EXECUTE Node: Executes the generated code
async def execute_node(state: AgentState) -> AgentState:
    try:
        # Execute the code in a subprocess for safety
        result = subprocess.run(
            ["python", "-c", state.code_to_execute],
            capture_output=True,
            text=True,
            check=True
        )
        state.execution_result = {"stdout": result.stdout, "stderr": result.stderr}
        state.chat_history.append({"role": "agent", "content": f"Execution result: {result.stdout}"})
    except subprocess.CalledProcessError as e:
        state.error_message = f"Error during execution: {e.stderr}"
        state.chat_history.append({"role": "agent", "content": state.error_message})
        # Placeholder for error correction logic (e.g., CRS mismatch)
        if "CRS mismatch" in e.stderr.lower():
            state.plan = "Revised plan: Reproject data to match CRS using gdal.Warp."
            state.code_to_execute = """
import gdal
# Placeholder: Reproject data
gdal.Warp('reprojected.tif', 'path_to_dem.tif', dstSRS='EPSG:4326')
"""
            state.chat_history.append({"role": "agent", "content": "Detected CRS mismatch. Generated new code to reproject data."})
    return state

# Define the LangGraph workflow
workflow = StateGraph(AgentState)
workflow.add_node("plan", plan_node)
workflow.add_node("generate_code", generate_code_node)
workflow.add_node("execute", execute_node)
workflow.add_edge("plan", "generate_code")
workflow.add_edge("generate_code", "execute")
workflow.add_edge("execute", END)
graph = workflow.compile()

# WebSocket endpoint for real-time agent interaction
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            state = AgentState(user_query=data, chat_history=[])
            async for updated_state in graph.astream(state):
                # Stream state updates to frontend
                await websocket.send_text(json.dumps({
                    "plan": updated_state.plan,
                    "code": updated_state.code_to_execute,
                    "result": updated_state.execution_result,
                    "error": updated_state.error_message,
                    "chat_history": updated_state.chat_history
                }))
    except Exception as e:
        await websocket.send_text(json.dumps({"error": str(e)}))
        await websocket.close()

# Endpoint to serve geospatial files
@app.get("/geospatial/{filename}")
async def serve_geospatial_file(filename: str):
    file_path = f"output/{filename}"  # Adjust path as needed
    if os.path.exists(file_path):
        with open(file_path, "rb") as f:
            content = f.read()
        return {"content": content, "media_type": "application/octet-stream"}
    return {"error": "File not found"}

# Initialize knowledge base on startup
@app.on_event("startup")
async def startup_event():
    setup_knowledge_base()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)