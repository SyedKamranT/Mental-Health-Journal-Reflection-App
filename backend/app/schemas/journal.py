from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel

class JournalEntryBase(BaseModel):
    content: str
    mood: Optional[str] = None
    tags: List[str] = []

class JournalEntryCreate(JournalEntryBase):
    pass

class JournalEntryUpdate(JournalEntryBase):
    content: Optional[str] = None
    mood: Optional[str] = None
    tags: Optional[List[str]] = None

class JournalEntryResponse(JournalEntryBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    reflection: Optional[str] = None

    class Config:
        from_attributes = True

class JournalAnalysisRequest(BaseModel):
    entry_id: int
