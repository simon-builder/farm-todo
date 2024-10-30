from pydantic import BaseModel, Field
from typing import Optional


class TodoList(BaseModel):
    id: Optional[str] = None
    name: str = Field(..., min_length=1, description="The name of the list cannot be empty")
