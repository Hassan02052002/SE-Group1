from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.ai import router as ai_router
from routes.users import router as users_router  # Importing users properly
from fastapi.middleware.cors import CORSMiddleware
from routes.health import router as health_router  # Importing health router
from db import db 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(ai_router, prefix="/ai", tags=["AI"])
app.include_router(users_router, prefix="/users", tags=["Users"])  # Include users router
app.include_router(health_router)  # Register the health endpoint
@app.get("/")
def root():
    return {"message": "Welcome to AI Travel Itinerary API hehehe by Group 1!"}  # Change the welcome message

# ✅ Test MongoDB Connection Route
@app.get("/test-db")
def test_db():
    try:
        db.list_collection_names()  # ✅ This will check if MongoDB is connected
        return {"message": "MongoDB connection successful!"}
    except Exception as e:
        return {"error": str(e)}
