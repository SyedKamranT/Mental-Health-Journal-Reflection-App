"""CRUD operations for journal entries and their analyses."""

from app.core.database import supabase_admin


class CRUDJournal:
    """
    All operations use supabase_admin (service role) because
    user-scoping is handled explicitly via user_id parameter,
    and the backend auth middleware already verified the JWT.
    """

    # ---------- Journal Entries ----------

    def create(self, user_id: str, content: str, word_count: int) -> dict:
        """Create a new journal entry."""
        data = {
            "user_id": user_id,
            "content": content,
            "word_count": word_count,
        }
        response = (
            supabase_admin.table("journal_entries")
            .insert(data)
            .execute()
        )
        return response.data[0] if response.data else None

    def get(self, entry_id: str, user_id: str) -> dict | None:
        """Get a single journal entry by ID (user-scoped)."""
        response = (
            supabase_admin.table("journal_entries")
            .select("*")
            .eq("id", entry_id)
            .eq("user_id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def get_multi(
        self,
        user_id: str,
        search: str | None = None,
        page: int = 1,
        limit: int = 20,
    ) -> tuple[list[dict], int]:
        """
        Get paginated journal entries for a user.
        Returns (entries, total_count).
        """
        query = (
            supabase_admin.table("journal_entries")
            .select("*", count="exact")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
        )

        if search:
            query = query.ilike("content", f"%{search}%")

        offset = (page - 1) * limit
        query = query.range(offset, offset + limit - 1)

        response = query.execute()
        total = response.count or 0
        return response.data or [], total

    def update(self, entry_id: str, user_id: str, content: str, word_count: int) -> dict | None:
        """Update a journal entry."""
        data = {"content": content, "word_count": word_count}
        response = (
            supabase_admin.table("journal_entries")
            .update(data)
            .eq("id", entry_id)
            .eq("user_id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def delete(self, entry_id: str, user_id: str) -> bool:
        """Delete a journal entry (cascade deletes analysis too)."""
        response = (
            supabase_admin.table("journal_entries")
            .delete()
            .eq("id", entry_id)
            .eq("user_id", user_id)
            .execute()
        )
        return len(response.data) > 0 if response.data else False

    def count_entries(self, user_id: str) -> int:
        """Count total entries for a user."""
        response = (
            supabase_admin.table("journal_entries")
            .select("id", count="exact")
            .eq("user_id", user_id)
            .execute()
        )
        return response.count or 0

    def get_entries_in_range(
        self, user_id: str, start_date: str, end_date: str
    ) -> list[dict]:
        """Get entries within a date range."""
        response = (
            supabase_admin.table("journal_entries")
            .select("*")
            .eq("user_id", user_id)
            .gte("created_at", start_date)
            .lte("created_at", end_date)
            .order("created_at", desc=True)
            .execute()
        )
        return response.data or []

    def count_entries_in_month(self, user_id: str, year: int, month: int) -> int:
        """Count entries in a specific month."""
        start = f"{year}-{month:02d}-01T00:00:00"
        if month == 12:
            end = f"{year + 1}-01-01T00:00:00"
        else:
            end = f"{year}-{month + 1:02d}-01T00:00:00"

        response = (
            supabase_admin.table("journal_entries")
            .select("id", count="exact")
            .eq("user_id", user_id)
            .gte("created_at", start)
            .lt("created_at", end)
            .execute()
        )
        return response.count or 0

    def delete_all_for_user(self, user_id: str) -> bool:
        """Delete all journal entries for a user."""
        response = (
            supabase_admin.table("journal_entries")
            .delete()
            .eq("user_id", user_id)
            .execute()
        )
        return True

    # ---------- Entry Analyses ----------

    def create_analysis(self, entry_id: str, user_id: str, analysis_data: dict) -> dict:
        """Store LLM analysis for a journal entry."""
        data = {
            "entry_id": entry_id,
            "user_id": user_id,
            "summary": analysis_data.get("summary", ""),
            "themes": analysis_data.get("themes", []),
            "emotional_scores": analysis_data.get("emotional_scores", {}),
            "reflective_questions": analysis_data.get("reflective_questions", []),
            "sentiment": analysis_data.get("sentiment", "Neutral"),
        }
        response = (
            supabase_admin.table("entry_analyses")
            .insert(data)
            .execute()
        )
        return response.data[0] if response.data else None

    def get_analysis(self, entry_id: str, user_id: str) -> dict | None:
        """Get the analysis for a journal entry."""
        response = (
            supabase_admin.table("entry_analyses")
            .select("*")
            .eq("entry_id", entry_id)
            .eq("user_id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def get_analyses_in_range(
        self, user_id: str, start_date: str, end_date: str
    ) -> list[dict]:
        """Get all analyses in a date range for a user."""
        response = (
            supabase_admin.table("entry_analyses")
            .select("*, journal_entries!inner(created_at)")
            .eq("user_id", user_id)
            .gte("journal_entries.created_at", start_date)
            .lte("journal_entries.created_at", end_date)
            .execute()
        )
        return response.data or []

    def get_all_analyses(self, user_id: str) -> list[dict]:
        """Get all analyses for a user."""
        response = (
            supabase_admin.table("entry_analyses")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        return response.data or []

    def get_recent_analyses(self, user_id: str, limit: int = 7) -> list[dict]:
        """Get most recent analyses."""
        response = (
            supabase_admin.table("entry_analyses")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(limit)
            .execute()
        )
        return response.data or []


journal_crud = CRUDJournal()
