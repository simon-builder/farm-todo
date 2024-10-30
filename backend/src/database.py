from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

client: AsyncIOMotorClient = None
database = None

def get_db():
    global client, database
    
    if client is None:
        client = AsyncIOMotorClient(settings.mongodb_url)
        
    db = client["todo_database"]
    yield db
    
def get_collection(collection_name: str):
    if database is None:
        raise Exception("Database is not connected")
    return database.get_collection(collection_name)

async def close_db():
    if client:
        client.close()