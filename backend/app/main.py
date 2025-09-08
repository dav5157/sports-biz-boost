
from fastapi import FastAPI
from app.core.config import settings
from app.api import router as api_router

# Select database backend
if settings.DB_BACKEND == "sqlite":
	from app.core.database_sqlite import engine, SessionLocal, Base
else:
	from app.core.database_postgres import engine, SessionLocal, Base

app = FastAPI(title="Sports Biz Boost Backend")
app.include_router(api_router)
