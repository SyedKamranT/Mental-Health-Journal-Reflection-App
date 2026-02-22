"""
LLM Service — OpenAI integration for journal analysis, weekly insights, and prompt generation.
All LLM functions return structured dicts with fallback responses on failure.
"""

import json
import logging
from openai import AsyncOpenAI
from app.core.config import settings

logger = logging.getLogger(__name__)

# OpenRouter uses the OpenAI-compatible API with a different base URL
client = AsyncOpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url=settings.OPENROUTER_BASE_URL,
)

# ============================================================
# JOURNAL ENTRY ANALYSIS
# ============================================================

ANALYZE_ENTRY_SYSTEM = """You are an empathetic, insightful mental health journaling assistant.
You analyze journal entries and provide supportive, non-clinical reflections.
Use warm, human language. Say "themes" not "symptoms". Say "reflection" not "assessment".
Always respond in valid JSON."""

ANALYZE_ENTRY_PROMPT = """Analyze this journal entry and return a JSON object with these exact keys:

1. "summary": A 2-3 sentence empathetic summary of what the person expressed (string)
2. "themes": 2-4 emotional themes detected, like "Reflective", "Hopeful", "Focused", "Grateful", "Resilient", "Peaceful", "Vulnerable", "Brave", "Connected", "Mindful" (array of strings)
3. "emotional_scores": An object with "calm", "energy", "clarity" — each an integer 0-100 representing the emotional tone (object)
4. "reflective_questions": 2 thoughtful follow-up questions to deepen reflection (array of strings)
5. "sentiment": Overall sentiment — "Positive", "Neutral", or "Negative" (string)

Journal Entry:
"{content}"

Return ONLY valid JSON, no markdown formatting."""


async def analyze_journal_entry(content: str) -> dict:
    """
    Analyze a journal entry using the LLM.
    Returns structured analysis or fallback on failure.
    """
    try:
        response = await client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": ANALYZE_ENTRY_SYSTEM},
                {"role": "user", "content": ANALYZE_ENTRY_PROMPT.format(content=content)},
            ],

            temperature=0.7,
            max_tokens=800,
        )
        result = json.loads(response.choices[0].message.content)
        # Validate/normalize the response
        return {
            "summary": result.get("summary", ""),
            "themes": result.get("themes", [])[:4],
            "emotional_scores": {
                "calm": _clamp(result.get("emotional_scores", {}).get("calm", 50)),
                "energy": _clamp(result.get("emotional_scores", {}).get("energy", 50)),
                "clarity": _clamp(result.get("emotional_scores", {}).get("clarity", 50)),
            },
            "reflective_questions": result.get("reflective_questions", [])[:3],
            "sentiment": result.get("sentiment", "Neutral"),
        }
    except Exception as e:
        logger.error(f"LLM analyze_entry failed: {e}")
        return _fallback_analysis()


# ============================================================
# WEEKLY INSIGHT GENERATION
# ============================================================

WEEKLY_INSIGHT_SYSTEM = """You are a compassionate mental health journaling assistant.
You analyze a week of journal entries and provide a gentle, insightful weekly summary.
Use warm, non-clinical language. Always respond in valid JSON."""

WEEKLY_INSIGHT_PROMPT = """Based on these journal entry summaries and themes from the past week, generate a weekly insight.

Entry summaries and themes:
{entries_summary}

Return a JSON object with these exact keys:
1. "observations": 3 key observations about patterns, growth, or notable themes (array of strings, each 1-2 sentences)
2. "reflection_suggestion": A single thoughtful question or suggestion for the coming week (string, 1-2 sentences)
3. "theme_distribution": An object mapping theme names to their frequency count this week (object)

Return ONLY valid JSON, no markdown formatting."""


async def generate_weekly_insight(entries_data: list[dict]) -> dict:
    """
    Generate a weekly insight from a list of entry analyses.
    entries_data: list of dicts with 'summary' and 'themes' keys.
    """
    if not entries_data:
        return _fallback_weekly_insight()

    try:
        entries_summary = "\n".join(
            f"- Summary: {e.get('summary', 'N/A')} | Themes: {', '.join(e.get('themes', []))}"
            for e in entries_data
        )

        response = await client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": WEEKLY_INSIGHT_SYSTEM},
                {"role": "user", "content": WEEKLY_INSIGHT_PROMPT.format(entries_summary=entries_summary)},
            ],

            temperature=0.7,
            max_tokens=600,
        )
        result = json.loads(response.choices[0].message.content)
        return {
            "observations": result.get("observations", [])[:3],
            "reflection_suggestion": result.get("reflection_suggestion", ""),
            "theme_distribution": result.get("theme_distribution", {}),
        }
    except Exception as e:
        logger.error(f"LLM generate_weekly_insight failed: {e}")
        return _fallback_weekly_insight()


# ============================================================
# REFLECTION PROMPT GENERATION
# ============================================================

GENERATE_PROMPTS_SYSTEM = """You are a thoughtful mental health journaling assistant.
You create personalized, warm reflection prompts for journaling.
Prompts should be open-ended, non-judgmental, and encouraging.
Always respond in valid JSON."""

GENERATE_PROMPTS_PROMPT = """Generate 3 unique, personalized journaling prompts for each of these categories:
- growth: Personal development, goals, learning from challenges
- gratitude: Appreciation, joy, kindness, positive moments
- clarity: Self-understanding, balance, letting go, priorities
- stress: Release, peace, coping, lightening mental load

Return a JSON object with these exact keys:
{{
  "growth": ["prompt1", "prompt2", "prompt3"],
  "gratitude": ["prompt1", "prompt2", "prompt3"],
  "clarity": ["prompt1", "prompt2", "prompt3"],
  "stress": ["prompt1", "prompt2", "prompt3"]
}}

Each prompt should be 1-2 sentences, warm and inviting. Return ONLY valid JSON."""


async def generate_prompts() -> dict[str, list[str]]:
    """Generate new reflection prompts for all categories."""
    try:
        response = await client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": GENERATE_PROMPTS_SYSTEM},
                {"role": "user", "content": GENERATE_PROMPTS_PROMPT},
            ],
            response_format={"type": "json_object"},
            temperature=0.9,
            max_tokens=800,
        )
        result = json.loads(response.choices[0].message.content)
        return {
            "growth": result.get("growth", [])[:3],
            "gratitude": result.get("gratitude", [])[:3],
            "clarity": result.get("clarity", [])[:3],
            "stress": result.get("stress", [])[:3],
        }
    except Exception as e:
        logger.error(f"LLM generate_prompts failed: {e}")
        return _fallback_prompts()


# ============================================================
# HELPERS
# ============================================================

def _clamp(value, min_val=0, max_val=100) -> int:
    """Clamp a value between min and max."""
    try:
        return max(min_val, min(max_val, int(value)))
    except (ValueError, TypeError):
        return 50


def _fallback_analysis() -> dict:
    """Return a safe fallback when LLM analysis fails."""
    return {
        "summary": "Your entry has been saved. AI analysis is temporarily unavailable, but your thoughts are safe and valued.",
        "themes": ["Reflective"],
        "emotional_scores": {"calm": 50, "energy": 50, "clarity": 50},
        "reflective_questions": [
            "What feelings stand out most from what you wrote?",
            "Is there something you'd like to explore further?",
        ],
        "sentiment": "Neutral",
    }


def _fallback_weekly_insight() -> dict:
    """Return a safe fallback when weekly insight generation fails."""
    return {
        "observations": [
            "Keep journaling to build patterns and insights over time.",
        ],
        "reflection_suggestion": "What moments this week brought you the most peace?",
        "theme_distribution": {},
    }


def _fallback_prompts() -> dict[str, list[str]]:
    """Return default prompts when generation fails."""
    return {
        "growth": [
            "What's one small step you could take today toward a goal that matters to you?",
            "Reflect on a challenge you overcame recently. What did you learn?",
            "Where do you see yourself growing in the next three months?",
        ],
        "gratitude": [
            "What's something small that brought you joy today?",
            "Who has shown you kindness recently?",
            "What part of your daily routine are you most grateful for?",
        ],
        "clarity": [
            "What does balance mean to you right now?",
            "If you could tell your past self something, what would it be?",
            "What are you holding onto that no longer serves you?",
        ],
        "stress": [
            "What's weighing on your mind today? Write it out without judgment.",
            "When do you feel most at peace?",
            "What's one thing you can let go of this week?",
        ],
    }
