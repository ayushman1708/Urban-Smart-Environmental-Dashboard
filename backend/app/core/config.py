import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "Urban Smart Environmental Dashboard"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "ecosense_secret_key_change_in_production_for_security"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    # Database: SQLite default fallback, PostgreSQL support via env
    DATABASE_URL: str = "sqlite:///./ecosense.db"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]

    GEMINI_API_KEY: str = ""
    DEMO_MODE: bool = True

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
