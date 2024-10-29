from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

from src.api.main import api_router
from .database import get_db, close_db, get_collection
from .config import settings

app = FastAPI()

# Allow only the React app's URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],  # You can specify methods like ["GET", "POST"] if needed
    allow_headers=["*"],  # You can specify headers if needed
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {"message": "Dummy Route"}
