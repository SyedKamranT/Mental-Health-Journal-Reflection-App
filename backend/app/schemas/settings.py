"""Pydantic schemas for user settings."""

from pydantic import BaseModel


class ProfileResponse(BaseModel):
    name: str | None = None
    email: str | None = None


class ProfileUpdate(BaseModel):
    name: str | None = None
    email: str | None = None


class PreferencesResponse(BaseModel):
    ai_processing: bool = True
    usage_analytics: bool = False
    dark_mode: bool = True


class PreferencesUpdate(BaseModel):
    ai_processing: bool | None = None
    usage_analytics: bool | None = None
    dark_mode: bool | None = None
