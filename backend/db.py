import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load MongoDB URI from .env
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
	raise ValueError("MONGO_URI environment variable not set")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
print(client.list_database_names())
db = client["Nomad"]  
users_collection = db["users"]  # Collection for storing users
itineraries_collection = db["itineraries"]

# Check if connection to MongoDB is established
try:
	# The ping command is cheap and does not require auth.
	client.admin.command('ping')
	print("Connection to MongoDB established successfully.")
except Exception as e:
	print(f"Failed to connect to MongoDB: {e}")

