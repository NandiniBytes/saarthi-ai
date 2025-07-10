# =================================================================
# File: saarthi-backend/agent/tools.py
# =================================================================
# This version is for the simpler, non-Docker setup.
# It executes code using the local Python environment.

import subprocess
import sys
import os

def execute_python_code(code: str) -> dict:
    """
    Executes a string of Python code using the local system's Python interpreter.
    Captures and returns stdout and stderr.
    """
    print(f"\n--- EXECUTING CODE (Locally) ---\n{code}\n---------------------------------")
    
    # Ensure output directory exists
    if not os.path.exists("outputs"):
        os.makedirs("outputs")

    try:
        # Use the same python executable that is running this script.
        # This ensures it runs within your activated virtual environment.
        process = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True,
            text=True,
            check=True,
            timeout=120  # 120-second timeout for safety
        )
        result = {"stdout": process.stdout, "stderr": ""}
        print(f"--- EXECUTION SUCCESS ---\nSTDOUT:\n{process.stdout}\n-------------------------")
        return result
        
    except subprocess.CalledProcessError as e:
        # This block catches errors from the executed script itself
        result = {"stdout": e.stdout, "stderr": e.stderr}
        print(f"--- EXECUTION FAILED ---\nSTDERR:\n{e.stderr}\n------------------------")
        return result
        
    except Exception as e:
        # Catch any other unexpected errors
        error_message = f"An unexpected error occurred: {str(e)}"
        result = {"stdout": "", "stderr": error_message}
        print(f"--- EXECUTION FAILED ---\n{error_message}\n------------------------")
        return result
