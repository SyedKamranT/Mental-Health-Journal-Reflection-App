"""API v1 router aggregation — registers all endpoint routers."""

from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, dashboard, insights, prompts, settings
from app.api.v1.endpoints import journal

api_router = APIRouter()

# Auth (no prefix — /api/v1/auth/...)
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

# Journal CRUD + analysis
api_router.include_router(journal.router, prefix="/journal", tags=["journal"])

# Dashboard (single aggregated endpoint)
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])

# Insights & analytics
api_router.include_router(insights.router, prefix="/insights", tags=["insights"])

# Reflection prompts
api_router.include_router(prompts.router, prefix="/prompts", tags=["prompts"])

# User settings (profile, preferences, data management)
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
