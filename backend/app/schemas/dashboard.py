"""Pydantic schemas for the dashboard endpoint."""

from pydantic import BaseModel


class EmotionalTrendPoint(BaseModel):
    """Matches EmotionalTrendChart data shape: {day, calm, energy, clarity}."""
    day: str
    calm: int
    energy: int
    clarity: int


class DashboardResponse(BaseModel):
    """All data needed by DashboardPage.tsx in a single response."""
    is_first_time: bool = True
    streak_days: int = 0
    streak_message: str = "Start your journey!"
    monthly_entries: int = 0
    monthly_average: float = 0.0
    growth_percentage: int = 0
    growth_message: str = ""
    emotional_trend: list[EmotionalTrendPoint] = []
    recent_prompt: str | None = None
    recent_pattern: str | None = None
