from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

client: AsyncIOMotorClient = None
database = None

async def connect_db():
    global client, database
    
    #client = AsyncIOMotorClient(settings.mongodb_url)
    client = AsyncIOMotorClient("mongodb://localhost:27017/todo")
    database = client.get_default_database()

    # # Ensure the database is available:
    pong = await database.command("ping")
    if int(pong["ok"]) != 1:
        raise Exception("Cluster connection is not okay!")
    
def get_collection(collection_name: str):
    if database is None:
        raise Exception("Database is not connected")
    return database.get_collection(collection_name)

async def close_db():
    if client:
        client.close()