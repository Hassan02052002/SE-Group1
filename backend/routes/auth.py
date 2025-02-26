from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
from db import users_collection 
from fastapi.security import OAuth2PasswordBearer

# Load environment variables
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# User models
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Generate JWT token
def create_jwt_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Get current user from JWT
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")



# Register user
@router.post("/register")
async def register(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    token = create_jwt_token({"email": user.email})
    return {"message": "User registered successfully", "token": token}

# Login user
@router.post("/login")
async def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_jwt_token({"email": user.email})
    return {"token": token}

@router.get("/me")
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = users_collection.find_one({"email": payload["email"]}, {"_id": 0, "password": 0})
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
