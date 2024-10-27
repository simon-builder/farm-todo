from fastapi import FastAPI

from src.api.main import api_router
from .database import connect_db, close_db

async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

app.include_router(api_router)

@app.get("/")
async def root():
    return {"message": "Dummy Route"}