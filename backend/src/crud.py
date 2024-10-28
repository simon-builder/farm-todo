from motor.motor_asyncio import AsyncIOMotorCollection
from .models import TodoList  # Import your Pydantic model

class ToDoCRUD:
    def __init__(self, db: AsyncIOMotorCollection):
        self.collection = db["todo_lists"]

    async def create_item(self, name: str) -> TodoList:
        # Insert a new item into the collection
        response = await self.collection.insert_one({
            "name": name,
            "items": []
        })
        return TodoList(name=name)
        # return TodoList(f"Added {response.inserted_id} with the name {name}")