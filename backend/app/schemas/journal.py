"""Pydantic schemas for journal entries and analyses."""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


# ---------- Entry Analysis ----------

class EmotionalScores(BaseModel):
    calm: int = 50
    energy: int = 50
    clarity: int = 50


class EntryAnalysisResponse(BaseModel):
    id: str
    entry_id: str
    summary: str | None = None
    themes: list[str] = []
    emotional_scores: EmotionalScores = EmotionalScores()
    reflective_questions: list[str] = []
    sentiment: str = "Neutral"
    created_at: datetime | None = None


# ---------- Journal Entry ----------

class JournalEntryCreate(BaseModel):
    content: str


class JournalEntryUpdate(BaseModel):
    content: str | None = None


class JournalEntryResponse(BaseModel):
    """Full entry response (for single entry view / edit mode)."""
    id: str
    user_id: str
    content: str
    word_count: int = 0
    created_at: datetime
    updated_at: datetime | None = None
    analysis: EntryAnalysisResponse | None = None


class JournalEntryListItem(BaseModel):
    """Compact entry for history list — matches JournalEntryCard props."""
    id: str
    date: str  # ISO date string
    preview: str  # First ~150 chars of content
    themes: list[str] = []
    wordCount: int = 0


class JournalEntryListResponse(BaseModel):
    entries: list[JournalEntryListItem]
    total: int
    page: int
    limit: int


class JournalCreateResponse(BaseModel):
    """Response after creating an entry — includes the LLM analysis."""
    entry: JournalEntryResponse
    analysis: EntryAnalysisResponse | None = None
