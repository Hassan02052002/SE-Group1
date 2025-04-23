from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None  # Base64-encoded string or image URL if stored separately
