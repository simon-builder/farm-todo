from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from src.crud import ToDoCRUD
from src.database import get_db
from src.config import settings
from src.models import TodoList

router = APIRouter()

@router.get("/")
async def get_all_lists():
    return "calling api/lists"

@router.post("/", response_model=TodoList)
async def create_todo_list(name: TodoList, db: AsyncIOMotorDatabase = Depends(get_db)):
    crud = ToDoCRUD(db)
    
    try:
        todo_list = await crud.create_item(name.name)
        return todo_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f" Something went wrong in create_todo_list: {str(e)}")