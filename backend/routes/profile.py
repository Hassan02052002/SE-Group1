from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from fastapi.responses import JSONResponse
from uuid import uuid4
import os
from pathlib import Path

router = APIRouter()

UPLOAD_DIR = Path("uploads/profile_pictures")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/upload-profile-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id)  # adjust as per your auth
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type")

    ext = file.filename.split(".")[-1]
    filename = f"{uuid4().hex}.{ext}"
    filepath = UPLOAD_DIR / filename

    with open(filepath, "wb") as f:
        content = await file.read()
        f.write(content)

    image_url = f"/static/profile_pictures/{filename}"

    # TODO: Save `image_url` in user's DB record
    # e.g., update_user_profile_picture(user_id, image_url)

    return JSONResponse(content={"url": image_url})
