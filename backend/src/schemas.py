from pydantic import BaseModel

class TodoList(BaseModel):
    name: str