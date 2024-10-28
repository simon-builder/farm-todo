from fastapi import APIRouter, HTTPException

from src.models import TodoList
from crud import ToDoCRUD


router = APIRouter()

@router.get("/")
async def get_all_lists():
    return "calling api/lists"
#async def get_all_lists() -> list[ListSummary]:
#    return [i async for i in app.todo_dal.list_todo_lists()]

@router.post("/", response_model=str)
async def create_todo_list(name: str):
    
    try:
        #todo_list = await crud.create_item(name)
        # return todo_list
        todo_list = await crud.create_item(name)
        return "Test"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))