

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import router as api_router

# Select database backend
if settings.DB_BACKEND == "sqlite":
	from app.core.database_sqlite import engine, SessionLocal, Base
else:
	from app.core.database_postgres import engine, SessionLocal, Base


app = FastAPI(title="Sports Biz Boost Backend")

# Allow CORS for all origins (for development)
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(api_router)
