from fastapi import APIRouter
from src.api.lists import router as lists_router

api_router = APIRouter()
api_router.include_router(lists_router.router, prefix="/lists", tags=["lists"])