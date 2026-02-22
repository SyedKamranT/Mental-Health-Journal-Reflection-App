"""Journal entry endpoints — CRUD + LLM analysis."""

from fastapi import APIRouter, HTTPException, Depends, status, Query
from app.core.auth import get_current_user
from app.schemas.journal import (
    JournalEntryCreate, JournalEntryUpdate, JournalEntryResponse,
    JournalEntryListItem, JournalEntryListResponse, JournalCreateResponse,
    EntryAnalysisResponse, EmotionalScores,
)
from app.crud.crud_journal import journal_crud
from app.crud.crud_settings import settings_crud
from app.services.llm_service import analyze_journal_entry
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=JournalCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_journal_entry(
    body: JournalEntryCreate,
    user_id: str = Depends(get_current_user),
):
    """
    Create a new journal entry and trigger LLM analysis.
    Returns the entry + analysis (summary, themes, questions).
    """
    # Calculate word count
    word_count = len(body.content.strip().split()) if body.content.strip() else 0

    if word_count < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Entry must contain at least a few words.",
        )

    # Save the entry
    entry = journal_crud.create(user_id, body.content, word_count)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save journal entry.",
        )

    # Check if AI processing is enabled
    prefs = settings_crud.get_preferences(user_id)
    ai_enabled = prefs.get("ai_processing", True) if prefs else True

    analysis = None
    analysis_response = None

    if ai_enabled:
        try:
            # Run LLM analysis
            analysis_data = await analyze_journal_entry(body.content)

            # Store analysis in DB
            analysis = journal_crud.create_analysis(
                entry_id=entry["id"],
                user_id=user_id,
                analysis_data=analysis_data,
            )

            if analysis:
                scores = analysis.get("emotional_scores", {})
                analysis_response = EntryAnalysisResponse(
                    id=analysis["id"],
                    entry_id=analysis["entry_id"],
                    summary=analysis.get("summary"),
                    themes=analysis.get("themes", []),
                    emotional_scores=EmotionalScores(**scores) if isinstance(scores, dict) else EmotionalScores(),
                    reflective_questions=analysis.get("reflective_questions", []),
                    sentiment=analysis.get("sentiment", "Neutral"),
                    created_at=analysis.get("created_at"),
                )
        except Exception as e:
            logger.error(f"LLM analysis failed for entry {entry['id']}: {e}")
            # Entry is saved even if analysis fails

    entry_response = JournalEntryResponse(
        id=entry["id"],
        user_id=entry["user_id"],
        content=entry["content"],
        word_count=entry.get("word_count", word_count),
        created_at=entry["created_at"],
        updated_at=entry.get("updated_at"),
        analysis=analysis_response,
    )

    return JournalCreateResponse(entry=entry_response, analysis=analysis_response)


@router.get("/", response_model=JournalEntryListResponse)
async def list_journal_entries(
    search: str | None = Query(None, description="Search in entry content"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    user_id: str = Depends(get_current_user),
):
    """
    List journal entries with search and pagination.
    Returns compact items matching JournalEntryCard props.
    """
    entries, total = journal_crud.get_multi(
        user_id=user_id, search=search, page=page, limit=limit
    )

    items = []
    for e in entries:
        # Get themes from analysis
        analysis = journal_crud.get_analysis(e["id"], user_id)
        themes = analysis.get("themes", []) if analysis else []

        # Build preview (first ~150 chars)
        content = e.get("content", "")
        preview = content[:150] + "..." if len(content) > 150 else content

        items.append(JournalEntryListItem(
            id=e["id"],
            date=e["created_at"][:10] if e.get("created_at") else "",
            preview=preview,
            themes=themes,
            wordCount=e.get("word_count", 0),
        ))

    return JournalEntryListResponse(
        entries=items, total=total, page=page, limit=limit
    )


@router.get("/{entry_id}", response_model=JournalEntryResponse)
async def get_journal_entry(
    entry_id: str,
    user_id: str = Depends(get_current_user),
):
    """Get a single journal entry with its analysis."""
    entry = journal_crud.get(entry_id, user_id)
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal entry not found.",
        )

    # Get analysis
    analysis = journal_crud.get_analysis(entry_id, user_id)
    analysis_response = None
    if analysis:
        scores = analysis.get("emotional_scores", {})
        analysis_response = EntryAnalysisResponse(
            id=analysis["id"],
            entry_id=analysis["entry_id"],
            summary=analysis.get("summary"),
            themes=analysis.get("themes", []),
            emotional_scores=EmotionalScores(**scores) if isinstance(scores, dict) else EmotionalScores(),
            reflective_questions=analysis.get("reflective_questions", []),
            sentiment=analysis.get("sentiment", "Neutral"),
            created_at=analysis.get("created_at"),
        )

    return JournalEntryResponse(
        id=entry["id"],
        user_id=entry["user_id"],
        content=entry["content"],
        word_count=entry.get("word_count", 0),
        created_at=entry["created_at"],
        updated_at=entry.get("updated_at"),
        analysis=analysis_response,
    )


@router.patch("/{entry_id}", response_model=JournalEntryResponse)
async def update_journal_entry(
    entry_id: str,
    body: JournalEntryUpdate,
    user_id: str = Depends(get_current_user),
):
    """Update a journal entry's content."""
    existing = journal_crud.get(entry_id, user_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal entry not found.",
        )

    content = body.content if body.content else existing["content"]
    word_count = len(content.strip().split()) if content.strip() else 0

    updated = journal_crud.update(entry_id, user_id, content, word_count)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update entry.",
        )

    return JournalEntryResponse(
        id=updated["id"],
        user_id=updated["user_id"],
        content=updated["content"],
        word_count=updated.get("word_count", word_count),
        created_at=updated["created_at"],
        updated_at=updated.get("updated_at"),
    )


@router.delete("/{entry_id}")
async def delete_journal_entry(
    entry_id: str,
    user_id: str = Depends(get_current_user),
):
    """Delete a journal entry (cascades to analysis)."""
    existing = journal_crud.get(entry_id, user_id)
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal entry not found.",
        )

    journal_crud.delete(entry_id, user_id)
    return {"message": "Journal entry deleted successfully."}
