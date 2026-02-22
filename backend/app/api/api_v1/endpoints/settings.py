"""Settings endpoints — profile, preferences, data export, data deletion."""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from app.core.auth import get_current_user
from app.schemas.settings import (
    ProfileResponse, ProfileUpdate,
    PreferencesResponse, PreferencesUpdate,
)
from app.crud.crud_settings import settings_crud
from app.crud.crud_journal import journal_crud
from app.crud.crud_insights import insights_crud
from app.crud.crud_prompts import prompts_crud
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


# ---------- Profile ----------

@router.get("/profile", response_model=ProfileResponse)
async def get_profile(user_id: str = Depends(get_current_user)):
    """Get the current user's profile (name, email)."""
    profile = settings_crud.get_profile(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found.",
        )
    return ProfileResponse(
        name=profile.get("name", ""),
        email=profile.get("email", ""),
    )


@router.put("/profile", response_model=ProfileResponse)
async def update_profile(
    body: ProfileUpdate,
    user_id: str = Depends(get_current_user),
):
    """Update profile (name, email). Maps to Settings → Save Changes button."""
    updated = settings_crud.update_profile(
        user_id, body.model_dump(exclude_none=True)
    )
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile.",
        )
    return ProfileResponse(
        name=updated.get("name", ""),
        email=updated.get("email", ""),
    )


# ---------- Preferences ----------

@router.get("/preferences", response_model=PreferencesResponse)
async def get_preferences(user_id: str = Depends(get_current_user)):
    """Get privacy/appearance toggles. Maps to Settings switches."""
    prefs = settings_crud.ensure_preferences(user_id)
    return PreferencesResponse(
        ai_processing=prefs.get("ai_processing", True),
        usage_analytics=prefs.get("usage_analytics", False),
        dark_mode=prefs.get("dark_mode", True),
    )


@router.put("/preferences", response_model=PreferencesResponse)
async def update_preferences(
    body: PreferencesUpdate,
    user_id: str = Depends(get_current_user),
):
    """Update privacy/appearance toggles."""
    settings_crud.ensure_preferences(user_id)
    updated = settings_crud.update_preferences(
        user_id, body.model_dump(exclude_none=True)
    )
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update preferences.",
        )
    return PreferencesResponse(
        ai_processing=updated.get("ai_processing", True),
        usage_analytics=updated.get("usage_analytics", False),
        dark_mode=updated.get("dark_mode", True),
    )


# ---------- Data Management ----------

@router.get("/export")
async def export_all_data(user_id: str = Depends(get_current_user)):
    """
    Export all user data as JSON.
    Maps to Settings → Export All Journal Entries button.
    """
    # Entries
    entries, total = journal_crud.get_multi(user_id=user_id, page=1, limit=10000)

    # Analyses
    analyses = journal_crud.get_all_analyses(user_id)
    analysis_map = {a["entry_id"]: a for a in analyses}

    # Profile
    profile = settings_crud.get_profile(user_id)
    prefs = settings_crud.get_preferences(user_id)

    export = {
        "profile": profile,
        "preferences": prefs,
        "total_entries": total,
        "entries": [
            {
                "id": e["id"],
                "content": e["content"],
                "word_count": e.get("word_count", 0),
                "created_at": e["created_at"],
                "updated_at": e.get("updated_at"),
                "analysis": analysis_map.get(e["id"]),
            }
            for e in entries
        ],
    }

    return JSONResponse(
        content=export,
        headers={
            "Content-Disposition": "attachment; filename=journal_data_export.json",
        },
    )


@router.delete("/data")
async def delete_all_data(user_id: str = Depends(get_current_user)):
    """
    Delete ALL user data (entries, analyses, insights, prompts).
    Maps to Settings → Delete All Data button.
    Profile and preferences are preserved (to keep the account).
    """
    try:
        journal_crud.delete_all_for_user(user_id)
        insights_crud.delete_all_for_user(user_id)
        prompts_crud.delete_user_prompts(user_id)
        return {"message": "All journal data has been permanently deleted."}
    except Exception as e:
        logger.error(f"Data deletion error for user {user_id}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete data. Please try again.",
        )
