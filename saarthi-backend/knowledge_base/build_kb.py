import os
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings # <-- UPDATED THIS IMPORT


from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

# --- Configuration ---
# Add URLs to the documentation you want to scrape.
# Focus on API references and cookbooks.
URLS_TO_SCRAPE = [
    "https://gdal.org/python/index.html",
    "https://pcjericks.github.io/py-gdalogr-cookbook/",
    "https://docs.qgis.org/3.34/en/docs/pyqgis_developer_cookbook/processing.html"
]

FAISS_INDEX_PATH = "knowledge_base/faiss_index"

def build_knowledge_base():
    """
    Scrapes documentation, processes it, and builds a FAISS vector store.
    """
    print("Starting knowledge base build...")

    # 1. Load documents from web URLs
    print(f"Loading documents from {len(URLS_TO_SCRAPE)} URLs...")
    loader = WebBaseLoader(URLS_TO_SCRAPE)
    docs = loader.load()
    print(f"Loaded {len(docs)} documents.")

    # 2. Split documents into smaller chunks
    print("Splitting documents into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    print(f"Created {len(splits)} document chunks.")

    # 3. Create embeddings and build the FAISS vector store
    print("Creating embeddings with HuggingFace model...")
    # Using a popular open-source embedding model
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(documents=splits, embedding=embeddings)

    # 4. Save the vector store locally
    if not os.path.exists(FAISS_INDEX_PATH):
        os.makedirs(FAISS_INDEX_PATH)
    vectorstore.save_local(FAISS_INDEX_PATH)
    print(f"Knowledge base built and saved successfully at '{FAISS_INDEX_PATH}'")

if __name__ == "__main__":
    build_knowledge_base()

