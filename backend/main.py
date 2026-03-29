from fastapi import FastAPI
from api.routes import alert_Routes, voice_Routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(alert_Routes.router)
app.include_router(voice_Routes.router)

@app.get("/")
def home():
    return {"message": "Emergency Backend Running 🚀"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)