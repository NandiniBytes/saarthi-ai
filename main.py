# =================================================================
# File: saarthi-backend/main.py
# =================================================================
# Main entry point for the FastAPI application.

import uvicorn
from api.endpoints import app

# The 'if __name__ == "__main__":' block ensures this code only runs
# when you execute this file directly (e.g., `python main.py`).
if __name__ == "__main__":
    # This command starts the Uvicorn server, which will host our FastAPI app.
    # --reload makes the server automatically restart when you save code changes.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

