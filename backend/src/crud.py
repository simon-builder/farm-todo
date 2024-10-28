from motor.motor_asyncio import AsyncIOMotorCollection
from models import TodoList  # Import your Pydantic model

class ToDoCRUD:
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection

    async def create_item(self, name: str, ) -> TodoList:
        # Insert a new item into the collection
        response = await self.collection.insert_one({
            "name": name,
            "items": []
        })
        return "created item"
        # return TodoList(f"Added {response.inserted_id} with the name {name}")