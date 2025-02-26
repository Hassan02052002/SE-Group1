from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ai.nomad import generate_nomad_response  

router = APIRouter()

class ItineraryRequest(BaseModel):
    destination: str
    budget: int
    preferences: list[str]

@router.get("/")
async def test_ai():
    return {"message": "AI Route is working!"}

@router.post("/generate")
async def generate_itinerary(request: ItineraryRequest):
    try:
        # ✅ Pass all required arguments correctly
        response = generate_nomad_response(request.destination, request.budget, request.preferences)
        return {"itinerary": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

