from pydantic import BaseModel
from typing import Optional, List
import subprocess
import asyncio

# Define AgentState (same as above)
class AgentState(BaseModel):
    user_query: str
    plan: Optional[str] = None
    code_to_execute: Optional[str] = None
    execution_result: Optional[dict[str, str]] = None
    error_message: Optional[str] = None
    chat_history: List[dict[str, str]] = []

async def execute_node(state: AgentState) -> AgentState:
    """
    EXECUTE node: Runs the generated code in a subprocess and handles errors.
    Includes logic for CRS mismatch detection and correction.
    """
    try:
        # Execute code in a subprocess for safety
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
        # Error correction for CRS mismatch
        if "CRS mismatch" in e.stderr.lower():
            state.plan = (
                "Revised plan: Reproject data to match CRS using gdal.Warp.\n"
                "1. Identify CRS of input datasets.\n"
                "2. Reproject to a common CRS (e.g., EPSG:4326).\n"
                "3. Regenerate and execute code."
            )
            state.code_to_execute = """
import gdal
# Reproject DEM to EPSG:4326
gdal.Warp('data/dem/reprojected.tif', 'data/dem/CartoDEM_V3.0_R1.tif', dstSRS='EPSG:4326')
print('Reprojected DEM to EPSG:4326')
"""
            state.chat_history.append({"role": "agent", "content": "Detected CRS mismatch. Generated new code to reproject data."})
    return state