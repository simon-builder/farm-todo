from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi

from src.api.main import api_router
from .database import connect_db, close_db, get_collection
from .config import settings

async def lifespan(app: FastAPI):
    await connect_db()
    todo_lists = get_collection(settings.collection)
    # app.todo_dal = ToDoDAL(todo_lists)
    
    # Yield back to FastAPI Application:
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

app.include_router(api_router, prefix=settings.API_V1_STR)
# app.include_router(api_router, )

@app.get("/")
async def root():
    return {"message": "Dummy Route"}