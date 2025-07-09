
import subprocess
import os

# The name of the container as defined in your docker-compose.yml file
CONTAINER_NAME = "saarthi_backend_container"

def execute_python_code(code: str) -> dict:
    """
    Executes a string of Python code INSIDE the running Docker container.
    Captures and returns stdout and stderr.
    """
    print(f"\n--- EXECUTING CODE (in Docker) ---\n{code}\n---------------------------------")

    # This command uses 'docker exec' to run a command in a running container.
    # The command we run inside is `python3 -c "your_code_here"`
    command = [
        "docker", "exec", CONTAINER_NAME,
        "python3", "-c", code
    ]

    try:
        # Execute the command
        process = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True,  # This will raise a CalledProcessError if the command returns a non-zero exit code
            timeout=120  # 120-second timeout for safety
        )
        result = {"stdout": process.stdout, "stderr": ""}
        print(f"--- EXECUTION SUCCESS ---\nSTDOUT:\n{process.stdout}\n-------------------------")
        return result
        
    except subprocess.CalledProcessError as e:
        # This block catches errors from the executed script itself (non-zero exit code)
        result = {"stdout": e.stdout, "stderr": e.stderr}
        print(f"--- EXECUTION FAILED ---\nSTDERR:\n{e.stderr}\n------------------------")
        return result
        
    except subprocess.TimeoutExpired:
        # This block catches the command taking too long to run
        error_message = "Execution timed out after 120 seconds."
        result = {"stdout": "", "stderr": error_message}
        print(f"--- EXECUTION FAILED ---\n{error_message}\n------------------------")
        return result
        
    except FileNotFoundError:
        # This error occurs if the 'docker' command itself is not found on the host system
        error_message = "Docker command not found. Is Docker installed and running on the host machine?"
        result = {"stdout": "", "stderr": error_message}
        print(f"--- EXECUTION FAILED ---\n{error_message}\n------------------------")
        return result
    
    except Exception as e:
        # Catch any other unexpected errors
        error_message = f"An unexpected error occurred: {str(e)}"
        result = {"stdout": "", "stderr": error_message}
        print(f"--- EXECUTION FAILED ---\n{error_message}\n------------------------")
        return result

