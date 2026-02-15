from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.journal import JournalEntryCreate, JournalEntryResponse, JournalEntryUpdate
from app.crud.crud_journal import journal
from app.services.llm_service import analyze_journal_entry

router = APIRouter()

# TODO: Add authentication dependency to get current user_id
# For now, using a hardcoded user_id for demonstration
HARDCODED_USER_ID = "test-user-id"

@router.post("/", response_model=JournalEntryResponse)
def create_journal_entry(entry: JournalEntryCreate):
    return journal.create(user_id=HARDCODED_USER_ID, obj_in=entry)

@router.get("/", response_model=List[JournalEntryResponse])
def read_journal_entries(skip: int = 0, limit: int = 100):
    return journal.get_multi(user_id=HARDCODED_USER_ID, skip=skip, limit=limit)

@router.get("/{entry_id}", response_model=JournalEntryResponse)
def read_journal_entry(entry_id: int):
    entry = journal.get(id=entry_id, user_id=HARDCODED_USER_ID)
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry

@router.patch("/{entry_id}", response_model=JournalEntryResponse)
async def update_journal_entry(entry_id: int, entry_update: JournalEntryUpdate):
    existing_entry = journal.get(id=entry_id, user_id=HARDCODED_USER_ID)
    if not existing_entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    # If content is updated, we might want to trigger re-analysis or clear old reflection
    # For now, just updating data
    return journal.update(id=entry_id, user_id=HARDCODED_USER_ID, obj_in=entry_update)

@router.delete("/{entry_id}")
def delete_journal_entry(entry_id: int):
    existing_entry = journal.get(id=entry_id, user_id=HARDCODED_USER_ID)
    if not existing_entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    journal.remove(id=entry_id, user_id=HARDCODED_USER_ID)
    return {"message": "Journal entry deleted"}

@router.post("/{entry_id}/analyze")
async def analyze_entry(entry_id: int):
    entry = journal.get(id=entry_id, user_id=HARDCODED_USER_ID)
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    analysis = await analyze_journal_entry(entry['content'])
    
    # Optionally save analysis back to the entry (if schema supports it) or return it
    # For this iteration, we return the analysis
    return analysis
