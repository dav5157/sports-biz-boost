from fastapi import APIRouter

from .mock_endpoints import router as mock_router

router = APIRouter()

# Register mock endpoints for analytics, reports, scheduler
router.include_router(mock_router)
