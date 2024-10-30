from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from src.crud import ToDoCRUD
from src.database import get_db
from src.config import settings
from src.schemas import TodoList

router = APIRouter()


@router.get("/")
async def get_all_lists(db: AsyncIOMotorDatabase = Depends(get_db)):
    crud = ToDoCRUD(db)
    todo_lists = await crud.list_todo_lists()
    return todo_lists


@router.post("/", response_model=TodoList)
async def create_todo_list(name: TodoList, db: AsyncIOMotorDatabase = Depends(get_db)):
    crud = ToDoCRUD(db)

    try:
        todo_list = await crud.create_item(name.name)
        return todo_list
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f" Something went wrong in create_todo_list: {str(e)}",
        )

@router.put("/{list_id}")
async def update_list(
    list_id: str, 
    updated_list: TodoList,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    if not updated_list.name.strip():
        raise HTTPException(
            status_code=400,
            detail="List name cannot be empty or be only whitespace"
        )
    
    crud = ToDoCRUD(db)
    result = await crud.update_list(list_id, updated_list.name.strip())
    
    if result is None:
        raise HTTPException(
            status_code=404, 
            detail="List not found or invalid ID format"
        )
    
    return result

@router.delete("/{list_id}")
async def delete_list(list_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    crud = ToDoCRUD(db)
    success = await crud.delete_list(list_id)
    if not success:
        raise HTTPException(
            status_code=404, 
            detail="List not found or invalid ID format"
        )
    return {"message": "List deleted successfully"}