"""Pydantic schemas for reflection prompts."""

from pydantic import BaseModel


class PromptItem(BaseModel):
    """Matches the prompt shape used in ReflectionPromptsPage.tsx"""
    id: str
    prompt: str
    category: str


class PromptsResponse(BaseModel):
    """Response for GET /api/v1/prompts."""
    growth: list[PromptItem] = []
    gratitude: list[PromptItem] = []
    clarity: list[PromptItem] = []
    stress: list[PromptItem] = []


class GeneratePromptsRequest(BaseModel):
    """Optional: specify categories to generate."""
    categories: list[str] | None = None  # None = all categories
