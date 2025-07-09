<div align="center">

# 🛰️ Saarthi AI: Your Digital Charioteer for Geospatial Intelligence

**A project for the Bharatiya Antariksh Hackathon**

</div>

<div align="center">

*Saarthi AI is an advanced reasoning engine that transforms natural language commands into complex, multi-step geospatial analysis workflows. It acts as a digital expert, orchestrating a suite of powerful GIS tools to deliver insights, not just data.*

</div>

<p align="center">
  <img src="https://img.shields.io/badge/ISRO-Bharatiya%20Antariksh%20Hackathon-blue.svg" alt="ISRO Hackathon">
  <img src="https://img.shields.io/badge/Status-In%20Development-yellow.svg" alt="Status">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License">
</p>

---

## 🚀 The Mission: Bridging Human Intent and Machine Execution

Geospatial analysis is powerful, but it's also a bottleneck. A simple question like *"Show me areas in Gujarat vulnerable to flooding"* can trigger hours of work for a human expert involving data sourcing, tool selection, complex processing, and error handling.

**Saarthi AI** was born to solve this. It's not just a tool; it's an intelligent partner. Named after the Sanskrit word for "charioteer" (सारथि), Saarthi doesn't just execute commands—it understands the goal, plans the journey, and expertly guides the tools (the "horses") to the destination, navigating obstacles along the way.

## ✨ Core Features

Saarthi is built on a foundation of cutting-edge AI techniques to emulate the workflow of a seasoned GIS analyst.

* **🧠 Natural Language Reasoning:** Ask complex questions in plain English. Saarthi decomposes your high-level goal into a logical sequence of actions.
* **📝 Transparent Chain-of-Thought (CoT) Planning:** Watch Saarthi "think" in real-time. The UI displays its step-by-step plan, providing complete transparency into its reasoning process.
* **🛠️ RAG-Powered Tool Mastery:** Saarthi uses Retrieval-Augmented Generation (RAG) to consult a knowledge base of GIS tool documentation (GDAL, PyQGIS), ensuring it generates accurate, executable code every time.
* **🔄 Robust Self-Correction Loop:** This is Saarthi's superpower. When real-world data issues cause an error (like a CRS mismatch), Saarthi doesn't crash. It analyzes the error, formulates a new plan to fix it (e.g., "I will reproject the layer"), and re-attempts the task.
* **🌐 Multi-Source Data Integration:** Seamlessly orchestrates data access from sources like ISRO's Bhuvanidhi portal and OpenStreetMap.

## 🏛️ Architecture: The Robust Orchestrator

Saarthi is implemented as a stateful, cyclical graph using LangGraph. This architecture treats failure not as an endpoint, but as a state, enabling true resilience.

```mermaid
graph TD
    A[Start: User Query] --> B{PLAN};
    B --> C{SELECT TOOL & GENERATE CODE};
    C --> D[EXECUTE CODE];
    D --> E{Check for Errors};
    E -- Success --> B;
    E -- Failure --> F[HANDLE ERROR];
    F --> B;
    B -- Plan Complete --> G[End: Output Map];
````

## 💻 Tech Stack

| Category          | Technology                                       |
| ----------------- | ------------------------------------------------ |
| **Orchestration** | LangChain, LangGraph                             |
| **LLM Provider** | Groq (Llama 3)                                   |
| **Knowledge Base**| FAISS, Sentence-Transformers                     |
| **Geospatial** | GDAL, Python 3                                   |
| **Backend** | FastAPI, Gunicorn                                |
| **Deployment** | Docker, Docker Compose                           |
| **Frontend** | HTML, CSS, JavaScript (with Leaflet.js for maps) |

## ⚙️ Getting Started: Running Saarthi Locally

Saarthi is fully containerized with Docker for easy and reliable setup.

**Prerequisites:**

  * [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
  * A `.env` file in the project root with your `GROQ_API_KEY`.

**1. Create your Environment File:**
Create a file named `.env` in the `saarthi_backend` root directory:

```
GROQ_API_KEY="your-groq-api-key-here"
```

**2. Build the Knowledge Base:**
The agent needs a vector store of tool documentation. Run the build script once:

```bash
# Make sure your Docker daemon is running
python3 knowledge_base/build_kb.py
```

**3. Launch the Application:**
Use Docker Compose to build and run the entire backend stack with a single command:

```bash
docker-compose up --build
```

The backend will be available at `http://127.0.0.1:8000`.

**4. Connect via ngrok (Optional for live testing):**
To connect your deployed frontend to your local backend:

```bash
ngrok http 8000
```

Use the generated forwarding URL in your frontend's API calls.

## 🔭 Future Roadmap

The Robust Orchestrator is a powerful foundation. Future versions of Saarthi will explore even more advanced agentic architectures:

  * **Hierarchical Multi-Agent System:** A "team" of specialized agents (e.g., a DataScout, a GIS-Processor) managed by a central orchestrator.
  * **Proactive MCTS Planner:** Using Monte Carlo Tree Search to explore multiple solution paths and proactively choose the most efficient one (e.g., deciding between local processing vs. Google Earth Engine).
  * **Self-Improving Agent:** An agent that learns from its successes, adding completed workflows back into its knowledge base to solve similar problems faster in the future.

-----




<div align="center"> Built with ❤️ for the future of space technology in India. </div>

