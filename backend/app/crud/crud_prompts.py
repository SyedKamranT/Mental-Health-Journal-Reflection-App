"""CRUD operations for reflection prompts."""

from app.core.database import supabase_admin


class CRUDPrompts:

    def get_by_category(self, user_id: str, category: str | None = None) -> list[dict]:
        """
        Get prompts for a user by category.
        Includes default (global) prompts + user-specific prompts.
        """
        query = supabase_admin.table("reflection_prompts").select("*")

        # Get user's prompts + defaults
        query = query.or_(f"user_id.eq.{user_id},is_default.eq.true")

        if category:
            query = query.eq("category", category)

        query = query.order("created_at", desc=True)
        response = query.execute()
        return response.data or []

    def get_all_grouped(self, user_id: str) -> dict[str, list[dict]]:
        """Get all prompts grouped by category."""
        all_prompts = self.get_by_category(user_id)
        grouped = {
            "growth": [],
            "gratitude": [],
            "clarity": [],
            "stress": [],
        }
        for p in all_prompts:
            cat = p.get("category", "")
            if cat in grouped:
                grouped[cat].append(p)
        return grouped

    def create(self, user_id: str, prompt: str, category: str) -> dict:
        """Create a new user-specific prompt."""
        data = {
            "user_id": user_id,
            "prompt": prompt,
            "category": category,
            "is_default": False,
        }
        response = (
            supabase_admin.table("reflection_prompts")
            .insert(data)
            .execute()
        )
        return response.data[0] if response.data else None

    def create_many(self, user_id: str, prompts: list[dict]) -> list[dict]:
        """Create multiple prompts at once."""
        data = [
            {
                "user_id": user_id,
                "prompt": p["prompt"],
                "category": p["category"],
                "is_default": False,
            }
            for p in prompts
        ]
        response = (
            supabase_admin.table("reflection_prompts")
            .insert(data)
            .execute()
        )
        return response.data or []

    def delete_user_prompts(self, user_id: str) -> bool:
        """Delete all user-generated prompts (not defaults)."""
        supabase_admin.table("reflection_prompts").delete().eq(
            "user_id", user_id
        ).eq("is_default", False).execute()
        return True


prompts_crud = CRUDPrompts()
