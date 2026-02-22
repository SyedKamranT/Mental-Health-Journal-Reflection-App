"""CRUD operations for user settings (profile + preferences)."""

from app.core.database import supabase_admin


class CRUDSettings:

    # ---------- Profile ----------

    def get_profile(self, user_id: str) -> dict | None:
        """Get user profile."""
        response = (
            supabase_admin.table("profiles")
            .select("*")
            .eq("id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def update_profile(self, user_id: str, data: dict) -> dict | None:
        """Update user profile (name, email)."""
        update_data = {k: v for k, v in data.items() if v is not None}
        if not update_data:
            return self.get_profile(user_id)

        response = (
            supabase_admin.table("profiles")
            .update(update_data)
            .eq("id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    # ---------- Preferences ----------

    def get_preferences(self, user_id: str) -> dict | None:
        """Get user preferences."""
        response = (
            supabase_admin.table("user_preferences")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def update_preferences(self, user_id: str, data: dict) -> dict | None:
        """Update user preferences (toggles)."""
        update_data = {k: v for k, v in data.items() if v is not None}
        if not update_data:
            return self.get_preferences(user_id)

        response = (
            supabase_admin.table("user_preferences")
            .update(update_data)
            .eq("user_id", user_id)
            .execute()
        )
        return response.data[0] if response.data else None

    def ensure_preferences(self, user_id: str) -> dict:
        """Get or create default preferences for a user."""
        prefs = self.get_preferences(user_id)
        if not prefs:
            response = (
                supabase_admin.table("user_preferences")
                .insert({"user_id": user_id})
                .execute()
            )
            prefs = response.data[0] if response.data else {}
        return prefs


settings_crud = CRUDSettings()
