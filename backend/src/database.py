from motor.motor_asyncio import AsyncIOMotorClient

from .config import settings

client: AsyncIOMotorClient = None
database = None

async def connect_db():
    global client, database
    client = AsyncIOMotorClient(settings.mongodb_url)
    database = client.get_default_database()

    # Ensure the database is available:
    pong = await database.command("ping")
    if int(pong["ok"]) != 1:
        raise Exception("Cluster connection is not okay!")

    # todo_lists = database.get_collection(COLLECTION_NAME)
    # # app.todo_dal = ToDoDAL(todo_lists)

    # # Yield back to FastAPI Application:
    # yield

    # # Shutdown:
    # client.close()

async def close_db():
    if client:
        client.close()