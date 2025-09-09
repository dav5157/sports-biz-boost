from fastapi import APIRouter


from .mock_endpoints import router as mock_router
from .appointments import router as appointments_router

router = APIRouter()

# Register mock endpoints for analytics, reports, scheduler
router.include_router(mock_router)
# Register appointments endpoints (smart/manual booking)
router.include_router(appointments_router)
