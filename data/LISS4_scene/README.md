# LISS-4 Satellite Imagery

This folder contains a single scene from the LISS-4 sensor, carried on the Resourcesat-2/2A satellites. This high-resolution multispectral data is used for detailed analysis, such as land use classification.

A scene consists of multiple files, including `.TIF` files for each spectral band and associated metadata files (`.META`, `.TXT`, etc.). **All files for the scene must be kept together in this directory.**

## Download Instructions

1.  **Source:** [ISRO NRSC Bhuvanidhi Portal](https://bhoonidhi.nrsc.gov.in/bhoonidhi/index.html)
2.  **Action:**
    * Register and log in to the portal.
    * In the search interface, select the **Resourcesat-2/2A** satellites.
    * In the "Satellite-Sensor" list, select **`Resourcesat-2_LISS4(MX70)_L2`**.
    * Define your area of interest on the map and a date range.
    * From the search results, select a scene with low cloud cover and add it to your cart.
    * Download the complete scene data.
3.  **Final Files:**
    * Unzip the downloaded folder and place all the contents (all bands and metadata files) into this directory.
