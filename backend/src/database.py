from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

client: AsyncIOMotorClient = None
database = None

def get_db():
    global client, database
    
    if client is None:
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        
    db = client["todo_database"]  # Replace with your actual database name
    yield db
    
def get_collection(collection_name: str):
    if database is None:
        raise Exception("Database is not connected")
    return database.get_collection(collection_name)

async def close_db():
    if client:
        client.close()