from pydantic import BaseModel
from typing import Optional


class TodoList(BaseModel):
    id: Optional[str] = None
    name: str
