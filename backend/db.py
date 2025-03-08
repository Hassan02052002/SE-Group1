import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load MongoDB URI from .env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
print(client.list_database_names())
db = client["Nomad"]  # ✅ Ensures we are using 'Nomad' database
users_collection = db["users"]  # Collection for storing users


