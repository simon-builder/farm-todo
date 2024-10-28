from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

from src.api.main import api_router
from .database import get_db, close_db, get_collection
from .config import settings

app = FastAPI()

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Dummy Route"}