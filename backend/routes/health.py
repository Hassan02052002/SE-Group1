from fastapi import APIRouter, HTTPException
from db import client  # use the same client from your db.py

router = APIRouter()

@router.get("/health")
async def health_check():
    try:
        dbs = client.list_database_names()
        return {"status": "ok", "databases": dbs}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Database connection error")