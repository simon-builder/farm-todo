from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    mongodb_url: str
    API_V1_STR: str = "/api/v1"
    collection: str = "todo_lists"
    
    class Config:
        env_file = ".env"

settings = Settings()
