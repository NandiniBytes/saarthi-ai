from pydantic import BaseModel
from typing import Optional, List
import asyncio

# Define AgentState (same as above)
class AgentState(BaseModel):
    user_query: str
    plan: Optional[str] = None
    code_to_execute: Optional[str] = None
    execution_result: Optional[dict[str, str]] = None
    error_message: Optional[str] = None
    chat_history: List[dict[str, str]] = []

async def generate_code_node(state: AgentState) -> AgentState:
    """
    GENERATE_CODE node: Generates Python code for geospatial tasks based on query and plan.
    Focuses on flood mapping using PyQGIS/GDAL.
    """
    if "flood mapping" in state.user_query.lower():
        code = """
import gdal
import qgis.core
import os

# Initialize QGIS application (headless)
qgis.core.QgsApplication.setPrefixPath("/usr", True)
qgis_app = qgis.core.QgsApplication([], False)
qgis_app.initQgis()

# Load DEM, LULC, and soil data
dem_path = 'data/dem/CartoDEM_V3.0_R1.tif'
lulc_path = 'data/lulc/LULC_50K_2020.tif'
soil_path = 'data/soil/Soil_Map_India.shp'

# Placeholder: Perform flood mapping
dem = gdal.Open(dem_path)
# Example: Calculate flow accumulation (simplified)
# Further processing with PyQGIS for watershed delineation
output_path = 'output/flood_map.tif'
print(f'Generated flood map at {output_path}')
"""
    else:
        code = """
# Placeholder code for non-flood mapping tasks
print('No specific geospatial task identified')
"""
    state.code_to_execute = code
    state.chat_history.append({"role": "agent", "content": f"Generated code:\n{code}"})
    return state