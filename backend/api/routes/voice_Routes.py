import os
import shutil
from fastapi import FastAPI, UploadFile, File, APIRouter
from services.voice_services import transcribe_audio

app = FastAPI()

router = APIRouter(prefix="/api/VoiceTranscribe", tags=["VoiceTranscribe"])

@router.post("/transcribe")
async def handle_transcription(file: UploadFile = File(...)):
    try:
        tempPath = f"temp_recording.m4a" 

        with open(tempPath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        text = transcribe_audio(tempPath)  
        print(f"Transcribed Text: {text}")      
        return {"text": text}

    except Exception as e:
        return {"error": str(e)}
    finally:
        if os.path.exists(tempPath):
            try:
                os.remove(tempPath)
            except:
                pass