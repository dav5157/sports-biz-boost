from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    DB_BACKEND: str  # <-- Add this line
    SECRET_KEY: str
    SMTP_SERVER: str
    SMTP_PORT: int
    SMTP_USERNAME: str
    SMTP_PASSWORD: str
    EMAIL_FROM: str
    EMAIL_TO: str

    class Config:
        env_file = ".env"

settings = Settings()