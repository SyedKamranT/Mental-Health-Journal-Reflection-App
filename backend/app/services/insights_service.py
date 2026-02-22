"""
Insights service — aggregates emotional trends, theme distributions,
and weekly summaries for the InsightsPage.
"""

from datetime import datetime, timedelta, timezone
from collections import Counter
from app.crud.crud_journal import journal_crud
from app.crud.crud_insights import insights_crud
from app.services.llm_service import generate_weekly_insight


async def get_insights(user_id: str, period: str = "weekly") -> dict:
    """
    Build insights data for the specified period.
    period: "weekly" | "monthly" | "all"
    """
    now = datetime.now(timezone.utc)

    if period == "weekly":
        start_date = (now - timedelta(days=7)).isoformat()
        end_date = now.isoformat()
    elif period == "monthly":
        start_date = (now - timedelta(days=30)).isoformat()
        end_date = now.isoformat()
    else:  # all time
        start_date = "2020-01-01T00:00:00+00:00"
        end_date = now.isoformat()

    # Get analyses in range
    analyses = journal_crud.get_recent_analyses(user_id, limit=100)

    # Filter to date range
    filtered = []
    for a in analyses:
        created = a.get("created_at", "")
        if isinstance(created, str) and start_date <= created <= end_date:
            filtered.append(a)

    if not filtered:
        return {
            "emotional_trends": [],
            "theme_distribution": [],
            "weekly_summary": None,
            "period": period,
            "has_data": False,
        }

    # --- Emotional trends ---
    emotional_trends = _build_trends(filtered, now, period)

    # --- Theme distribution ---
    theme_distribution = _build_theme_distribution(filtered)

    # --- Weekly summary ---
    weekly_summary = None
    if period == "weekly":
        weekly_summary = await _get_or_generate_weekly_summary(
            user_id, filtered, now
        )

    return {
        "emotional_trends": emotional_trends,
        "theme_distribution": theme_distribution,
        "weekly_summary": weekly_summary,
        "period": period,
        "has_data": True,
    }


def _build_trends(
    analyses: list[dict], now: datetime, period: str
) -> list[dict]:
    """Build emotional trend data points."""
    day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    if period == "weekly":
        days = 7
    elif period == "monthly":
        days = 30
    else:
        days = min(len(analyses), 30)  # Cap at 30 data points

    trends = []
    for i in range(days - 1, -1, -1):
        date = now - timedelta(days=i)
        date_str = date.strftime("%Y-%m-%d")

        if period == "weekly":
            label = day_names[date.weekday()]
        else:
            label = date.strftime("%b %d")

        # Average scores for this day
        day_analyses = [
            a for a in analyses
            if isinstance(a.get("created_at", ""), str)
            and a["created_at"][:10] == date_str
        ]

        if day_analyses:
            calm = _avg_score(day_analyses, "calm")
            energy = _avg_score(day_analyses, "energy")
            clarity = _avg_score(day_analyses, "clarity")
        else:
            calm, energy, clarity = 50, 50, 50

        trends.append({
            "day": label,
            "calm": calm,
            "energy": energy,
            "clarity": clarity,
        })

    return trends


def _build_theme_distribution(analyses: list[dict]) -> list[dict]:
    """Count theme occurrences across analyses."""
    theme_counter = Counter()
    for a in analyses:
        themes = a.get("themes", [])
        if isinstance(themes, list):
            for theme in themes:
                theme_counter[theme] += 1

    return [
        {"theme": theme, "count": count}
        for theme, count in theme_counter.most_common(10)
    ]


async def _get_or_generate_weekly_summary(
    user_id: str, analyses: list[dict], now: datetime
) -> dict | None:
    """Get cached weekly summary or generate a new one via LLM."""
    # Calculate week boundaries (Monday to Sunday)
    days_since_monday = now.weekday()
    monday = (now - timedelta(days=days_since_monday)).date()
    sunday = (monday + timedelta(days=6))

    period_start = monday.isoformat()

    # Check cache
    cached = insights_crud.get_weekly_insight(user_id, period_start)
    if cached:
        return {
            "observations": cached.get("observations", []),
            "reflection_suggestion": cached.get("reflection_suggestion", ""),
        }

    # Generate via LLM
    entries_data = [
        {"summary": a.get("summary", ""), "themes": a.get("themes", [])}
        for a in analyses
    ]
    insight = await generate_weekly_insight(entries_data)

    # Cache the result
    theme_dist = {}
    for a in analyses:
        for theme in a.get("themes", []):
            theme_dist[theme] = theme_dist.get(theme, 0) + 1

    insights_crud.create_weekly_insight(
        user_id,
        {
            "period_start": period_start,
            "period_end": sunday.isoformat(),
            "observations": insight.get("observations", []),
            "reflection_suggestion": insight.get("reflection_suggestion", ""),
            "theme_distribution": theme_dist,
        },
    )

    return {
        "observations": insight.get("observations", []),
        "reflection_suggestion": insight.get("reflection_suggestion", ""),
    }


def _avg_score(analyses: list[dict], key: str) -> int:
    """Average a specific emotional score across analyses."""
    values = []
    for a in analyses:
        scores = a.get("emotional_scores", {})
        if isinstance(scores, dict) and key in scores:
            try:
                values.append(int(scores[key]))
            except (ValueError, TypeError):
                pass
    return int(sum(values) / len(values)) if values else 50
