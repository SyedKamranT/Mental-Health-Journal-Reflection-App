from app.core.database import supabase
from app.schemas.journal import JournalEntryCreate, JournalEntryUpdate

class CRUDJournal:
    def get_multi(self, user_id: str, skip: int = 0, limit: int = 100):
        response = supabase.table("journal_entries").select("*").eq("user_id", user_id).range(skip, skip + limit - 1).execute()
        return response.data

    def create(self, user_id: str, obj_in: JournalEntryCreate):
        data = obj_in.model_dump()
        data["user_id"] = user_id
        response = supabase.table("journal_entries").insert(data).execute()
        return response.data[0]

    def get(self, id: int, user_id: str):
        response = supabase.table("journal_entries").select("*").eq("id", id).eq("user_id", user_id).execute()
        return response.data[0] if response.data else None

    def update(self, id: int, user_id: str, obj_in: JournalEntryUpdate):
        data = obj_in.model_dump(exclude_unset=True)
        response = supabase.table("journal_entries").update(data).eq("id", id).eq("user_id", user_id).execute()
        return response.data[0] if response.data else None

    def remove(self, id: int, user_id: str):
        response = supabase.table("journal_entries").delete().eq("id", id).eq("user_id", user_id).execute()
        return response.data

journal = CRUDJournal()
