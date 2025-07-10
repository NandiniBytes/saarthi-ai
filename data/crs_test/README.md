# CRS Test Data

This folder contains the datasets required to test the agent's robustness and its ability to handle Coordinate Reference System (CRS) mismatches.

The goal is to have two vector files of the same geographic area but saved in different CRSs.

## Download Instructions

1.  **Source:** [Geofabrik OpenStreetMap Data Extracts](https://download.geofabrik.de/asia/india.html)
2.  **Action:**
    * Navigate to the link above and download the shapefile `.zip` for a specific state (e.g., `gujarat-latest-free.shp.zip`).
    * Unzip the file. You will find multiple shapefiles. For this test, we need `gis_osm_roads_free_1.shp` and `gis_osm_places_a_free_1.shp`.
3.  **Create the Mismatch:**
    * Open a GIS software like QGIS.
    * Load one of the files (e.g., `gis_osm_roads_free_1.shp`).
    * Right-click the layer -> "Export" -> "Save Features As...".
    * In the dialog, change the CRS to a different one. For example, if the original is WGS 84 (EPSG:4326), save the new file in a projected CRS like a specific UTM zone.
4.  **Final Files:**
    * Place both the original shapefile and the reprojected shapefile in this directory.
