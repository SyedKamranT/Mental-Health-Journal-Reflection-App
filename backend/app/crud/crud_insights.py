"""CRUD operations for weekly insights."""

from app.core.database import supabase_admin


class CRUDInsights:

    def get_weekly_insight(
        self, user_id: str, period_start: str
    ) -> dict | None:
        """Get weekly insight for a specific week."""
        response = (
            supabase_admin.table("weekly_insights")
            .select("*")
            .eq("user_id", user_id)
            .eq("period_start", period_start)
            .execute()
        )
        return response.data[0] if response.data else None

    def get_latest_insight(self, user_id: str) -> dict | None:
        """Get the most recent weekly insight."""
        response = (
            supabase_admin.table("weekly_insights")
            .select("*")
            .eq("user_id", user_id)
            .order("period_start", desc=True)
            .limit(1)
            .execute()
        )
        return response.data[0] if response.data else None

    def create_weekly_insight(self, user_id: str, data: dict) -> dict:
        """Create or update a weekly insight."""
        insert_data = {
            "user_id": user_id,
            "period_start": data["period_start"],
            "period_end": data["period_end"],
            "observations": data.get("observations", []),
            "reflection_suggestion": data.get("reflection_suggestion", ""),
            "theme_distribution": data.get("theme_distribution", {}),
        }
        # Upsert by user_id + period_start (unique constraint)
        response = (
            supabase_admin.table("weekly_insights")
            .upsert(insert_data, on_conflict="user_id,period_start")
            .execute()
        )
        return response.data[0] if response.data else None

    def delete_all_for_user(self, user_id: str) -> bool:
        """Delete all weekly insights for a user."""
        supabase_admin.table("weekly_insights").delete().eq(
            "user_id", user_id
        ).execute()
        return True


insights_crud = CRUDInsights()
