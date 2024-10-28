from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

client: AsyncIOMotorClient = None
database = None

def get_db():
    global client, database
    
    #client = AsyncIOMotorClient(settings.mongodb_url) # MongoDB Atlas
    # client = AsyncIOMotorClient("mongodb://localhost:27017/todo")
    # database = client.get_default_database()
    
    if client is None:
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        
    db = client["todo_database"]  # Replace with your actual database name
    yield db

    # # Ensure the database is available:
    # pong = database.command("ping")
    # if int(pong["ok"]) != 1:
    #     raise Exception("Cluster connection is not okay!")
    
    # yield database
    
def get_collection(collection_name: str):
    if database is None:
        raise Exception("Database is not connected")
    return database.get_collection(collection_name)

async def close_db():
    if client:
        client.close()