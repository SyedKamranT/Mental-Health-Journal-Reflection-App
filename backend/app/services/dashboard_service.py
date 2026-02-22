"""
Dashboard service — aggregates all data needed by DashboardPage.tsx.
Computes streak, monthly stats, growth %, emotional trends, and recent insights.
"""

from datetime import datetime, timedelta, timezone
from collections import Counter
from app.crud.crud_journal import journal_crud
from app.crud.crud_prompts import prompts_crud


async def get_dashboard_data(user_id: str) -> dict:
    """
    Build the complete dashboard response in a single call.
    All computations are server-side to minimize frontend work.
    """
    now = datetime.now(timezone.utc)

    # Check if first-time user
    total_entries = journal_crud.count_entries(user_id)
    is_first_time = total_entries == 0

    if is_first_time:
        return {
            "is_first_time": True,
            "streak_days": 0,
            "streak_message": "Start your journey!",
            "monthly_entries": 0,
            "monthly_average": 0.0,
            "growth_percentage": 0,
            "growth_message": "",
            "emotional_trend": [],
            "recent_prompt": None,
            "recent_pattern": None,
        }

    # --- Streak calculation ---
    streak_days = _calculate_streak(user_id, now)
    streak_message = _streak_message(streak_days)

    # --- Monthly stats ---
    current_month_count = journal_crud.count_entries_in_month(
        user_id, now.year, now.month
    )
    days_in_month = now.day
    weekly_avg = round(current_month_count / max(days_in_month / 7, 1), 1)

    # --- Growth % (compared to last month) ---
    if now.month == 1:
        prev_year, prev_month = now.year - 1, 12
    else:
        prev_year, prev_month = now.year, now.month - 1

    prev_month_count = journal_crud.count_entries_in_month(
        user_id, prev_year, prev_month
    )
    if prev_month_count > 0:
        growth = int(
            ((current_month_count - prev_month_count) / prev_month_count) * 100
        )
    else:
        growth = 100 if current_month_count > 0 else 0

    growth_msg = (
        f"{'More' if growth >= 0 else 'Less'} reflective than last month"
    )

    # --- Emotional trend (last 7 days) ---
    seven_days_ago = (now - timedelta(days=7)).isoformat()
    recent_analyses = journal_crud.get_recent_analyses(user_id, limit=7)
    emotional_trend = _build_emotional_trend(recent_analyses, now)

    # --- Recent prompt ---
    all_prompts = prompts_crud.get_by_category(user_id, "growth")
    recent_prompt = all_prompts[0]["prompt"] if all_prompts else None

    # --- Recent pattern (from latest analysis) ---
    recent_pattern = None
    if recent_analyses:
        latest = recent_analyses[0]
        themes = latest.get("themes", [])
        if themes:
            recent_pattern = (
                f"Your recent entries show themes of {', '.join(themes[:3]).lower()}. "
                f"These patterns suggest {_theme_interpretation(themes)}."
            )

    return {
        "is_first_time": False,
        "streak_days": streak_days,
        "streak_message": streak_message,
        "monthly_entries": current_month_count,
        "monthly_average": weekly_avg,
        "growth_percentage": growth,
        "growth_message": growth_msg,
        "emotional_trend": emotional_trend,
        "recent_prompt": recent_prompt,
        "recent_pattern": recent_pattern,
    }


def _calculate_streak(user_id: str, now: datetime) -> int:
    """Calculate consecutive days with journal entries."""
    streak = 0
    check_date = now.date()

    for _ in range(365):  # Max 1 year of streak
        start = datetime(check_date.year, check_date.month, check_date.day, tzinfo=timezone.utc).isoformat()
        end = datetime(check_date.year, check_date.month, check_date.day, 23, 59, 59, tzinfo=timezone.utc).isoformat()

        entries = journal_crud.get_entries_in_range(user_id, start, end)
        if entries:
            streak += 1
            check_date -= timedelta(days=1)
        else:
            break

    return streak


def _streak_message(days: int) -> str:
    """Generate a motivational streak message."""
    if days == 0:
        return "Start your streak today!"
    elif days == 1:
        return "Great start! Keep it going!"
    elif days < 7:
        return "Keep the momentum going!"
    elif days < 30:
        return "Amazing consistency!"
    else:
        return "Incredible dedication!"


def _build_emotional_trend(analyses: list[dict], now: datetime) -> list[dict]:
    """Build 7-day emotional trend for the chart."""
    day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    trend = []

    for i in range(6, -1, -1):
        date = now - timedelta(days=i)
        day_name = day_names[date.weekday()]

        # Find analysis for this day
        day_scores = {"calm": 50, "energy": 50, "clarity": 50}
        for analysis in analyses:
            analysis_date = analysis.get("created_at", "")
            if isinstance(analysis_date, str) and analysis_date[:10] == date.strftime("%Y-%m-%d"):
                scores = analysis.get("emotional_scores", {})
                if isinstance(scores, dict):
                    day_scores = {
                        "calm": scores.get("calm", 50),
                        "energy": scores.get("energy", 50),
                        "clarity": scores.get("clarity", 50),
                    }
                break

        trend.append({
            "day": day_name,
            "calm": day_scores["calm"],
            "energy": day_scores["energy"],
            "clarity": day_scores["clarity"],
        })

    return trend


def _theme_interpretation(themes: list[str]) -> str:
    """Generate a brief interpretation of emotional themes."""
    positive = {"Hopeful", "Grateful", "Peaceful", "Focused", "Connected", "Brave", "Resilient"}
    reflective = {"Reflective", "Mindful", "Vulnerable"}

    if any(t in positive for t in themes):
        return "growing clarity and positive momentum"
    elif any(t in reflective for t in themes):
        return "deepening self-awareness and introspection"
    else:
        return "an evolving emotional landscape"
