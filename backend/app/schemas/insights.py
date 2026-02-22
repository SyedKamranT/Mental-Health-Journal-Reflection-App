"""Pydantic schemas for insights endpoints."""

from pydantic import BaseModel


class EmotionalTrendPoint(BaseModel):
    """Matches EmotionalTrendChart data shape."""
    day: str
    calm: int
    energy: int
    clarity: int


class ThemeDistributionItem(BaseModel):
    """Matches ThemeDistributionChart data shape."""
    theme: str
    count: int


class WeeklySummary(BaseModel):
    """Matches the Weekly Summary card in InsightsPage.tsx."""
    observations: list[str] = []
    reflection_suggestion: str | None = None


class InsightsResponse(BaseModel):
    """Response for GET /api/v1/insights."""
    emotional_trends: list[EmotionalTrendPoint] = []
    theme_distribution: list[ThemeDistributionItem] = []
    weekly_summary: WeeklySummary | None = None
    period: str = "weekly"
    has_data: bool = False
