"""Dashboard endpoint — returns all data needed by DashboardPage.tsx."""

from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.dashboard import DashboardResponse
from app.services.dashboard_service import get_dashboard_data

router = APIRouter()


@router.get("/", response_model=DashboardResponse)
async def get_dashboard(user_id: str = Depends(get_current_user)):
    """
    Single endpoint returning all dashboard data:
    - is_first_time, streak, monthly stats, growth %
    - emotional trend chart data
    - recent prompt and pattern
    """
    data = await get_dashboard_data(user_id)
    return DashboardResponse(**data)
