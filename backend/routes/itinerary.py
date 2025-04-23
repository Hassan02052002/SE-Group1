from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
from db import itineraries_collection
from fastapi.security import OAuth2PasswordBearer
from .auth import get_current_user  # Importing get_current_user from the same routes folder


load_dotenv()
router = APIRouter()
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class ItinerarySaveRequest(BaseModel):
    email: EmailStr
    itinerary: str

@router.post("/save-itinerary")
async def save_itinerary(
    data: ItinerarySaveRequest,
    token: str = Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("email")
        print(f"Decoded email from token: {user_email}")

        if user_email != data.email:
            raise HTTPException(status_code=403, detail="Unauthorized to save for this email")

        itineraries_collection.insert_one({
            "email": data.email,
            "itinerary": data.itinerary,
        })

        return {"message": "Itinerary saved successfully!"}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/saved-itineraries")
async def get_saved_itineraries(user=Depends(get_current_user)):
    try:
        user_email = user["email"]
        print(f"Fetching itineraries for user: {user_email}")
        itineraries = list(itineraries_collection.find({"email": user_email}, {"_id": 0}))
        return itineraries
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))