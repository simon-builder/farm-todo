from pydantic_settings import BaseSettings
from dotenv import load_dotenv
load_dotenv()

class Settings(BaseSettings):
    mongodb_url: str
    collection_name: str
    
    class Config:
        env_file = ".env"

settings = Settings()
