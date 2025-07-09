from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from agent.graph import get_agent_graph

app = FastAPI()

class QueryRequest(BaseModel):
    query: str
    chat_history: list = []

@app.post("/agent/invoke")
async def invoke_agent(request: QueryRequest):
    """
    A simple endpoint to test agent invocation with a single query.
    """
    graph = get_agent_graph()
    initial_state = {
        "user_query": request.query,
        "chat_history": request.chat_history
    }
    
    final_state = None
    async for event in graph.astream(initial_state):
        for key, value in event.items():
            print(f"--- STREAM EVENT: Node '{key}' finished ---")
            final_state = value

    return {"final_state": final_state}


@app.websocket("/ws/agent")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    graph = get_agent_graph()
    
    try:
        while True:
            data = await websocket.receive_json()
            initial_state = {
                "user_query": data["query"],
                "chat_history": data.get("chat_history", [])
            }
            
            async for event in graph.astream(initial_state):
                for node_name, state_update in event.items():
                    # Ensure payload is serializable
                    payload = {k: v for k, v in state_update.items() if k in ["user_query", "plan", "executed_steps", "code", "error_message", "chat_history"]}
                    await websocket.send_json({
                        "event": "node_update",
                        "node": node_name,
                        "payload": payload
                    })
            
            await websocket.send_json({"event": "finished"})

    except WebSocketDisconnect:
        print("Client disconnected")
