from motor.motor_asyncio import AsyncIOMotorCollection
from .schemas import TodoList
from bson import ObjectId
from bson.errors import InvalidId


class ToDoCRUD:
    def __init__(self, db: AsyncIOMotorCollection):
        self.collection = db["todo_lists"]

    async def list_todo_lists(self) -> list[TodoList]:
        docs = self.collection.find({}, {"name": 1, "_id": 1})
        return [TodoList(id=str(doc["_id"]), name=doc["name"]) async for doc in docs]

    async def create_item(self, name: str) -> TodoList:
        response = await self.collection.insert_one({"name": name, "items": []})
        return TodoList(name=name)

    async def delete_list(self, list_id: str) -> bool:
        try:
            result = await self.collection.delete_one({"_id": ObjectId(list_id)})
            return result.deleted_count > 0
        except InvalidId:
            return False  # Return False for invalid ID format

    async def update_list(self, list_id: str, name: str) -> TodoList | None:
        try:
            result = await self.collection.update_one(
                {"_id": ObjectId(list_id)},
                {"$set": {"name": name}}
            )
            if result.modified_count > 0:
                return TodoList(id=list_id, name=name)
            return None
        except InvalidId:
            return None
