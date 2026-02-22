"""Insights endpoints — emotional trends, theme distribution, weekly summaries."""

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from app.core.auth import get_current_user
from app.schemas.insights import InsightsResponse
from app.services.insights_service import get_insights
from app.crud.crud_journal import journal_crud

router = APIRouter()


@router.get("/", response_model=InsightsResponse)
async def get_insights_data(
    period: str = Query("weekly", description="weekly | monthly | all"),
    user_id: str = Depends(get_current_user),
):
    """
    Returns emotional trends, theme distribution, and weekly summary
    for the specified period. Matches InsightsPage.tsx tab structure.
    """
    if period not in ("weekly", "monthly", "all"):
        period = "weekly"

    data = await get_insights(user_id, period)
    return InsightsResponse(**data)


@router.get("/export")
async def export_insights(user_id: str = Depends(get_current_user)):
    """Export all journal data as JSON for download."""
    # Get all entries
    entries, total = journal_crud.get_multi(user_id=user_id, page=1, limit=10000)
    
    # Get all analyses
    analyses = journal_crud.get_all_analyses(user_id)
    
    # Build analysis lookup
    analysis_map = {a["entry_id"]: a for a in analyses}
    
    export_data = {
        "total_entries": total,
        "entries": [
            {
                "id": e["id"],
                "content": e["content"],
                "word_count": e.get("word_count", 0),
                "created_at": e["created_at"],
                "analysis": analysis_map.get(e["id"]),
            }
            for e in entries
        ],
    }
    
    return JSONResponse(
        content=export_data,
        headers={
            "Content-Disposition": "attachment; filename=journal_export.json",
        },
    )
