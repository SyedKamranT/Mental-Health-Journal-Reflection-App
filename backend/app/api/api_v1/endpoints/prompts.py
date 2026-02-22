"""Reflection prompts endpoints — list by category, generate new via LLM."""

from fastapi import APIRouter, Depends
from app.core.auth import get_current_user
from app.schemas.prompts import PromptItem, PromptsResponse
from app.crud.crud_prompts import prompts_crud
from app.services.llm_service import generate_prompts
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/", response_model=PromptsResponse)
async def list_prompts(user_id: str = Depends(get_current_user)):
    """
    Get all prompts grouped by category.
    Includes both default and user-specific prompts.
    Matches the tab structure in ReflectionPromptsPage.tsx.
    """
    grouped = prompts_crud.get_all_grouped(user_id)

    return PromptsResponse(
        growth=[
            PromptItem(id=p["id"], prompt=p["prompt"], category=p["category"])
            for p in grouped.get("growth", [])
        ],
        gratitude=[
            PromptItem(id=p["id"], prompt=p["prompt"], category=p["category"])
            for p in grouped.get("gratitude", [])
        ],
        clarity=[
            PromptItem(id=p["id"], prompt=p["prompt"], category=p["category"])
            for p in grouped.get("clarity", [])
        ],
        stress=[
            PromptItem(id=p["id"], prompt=p["prompt"], category=p["category"])
            for p in grouped.get("stress", [])
        ],
    )


@router.post("/generate", response_model=PromptsResponse)
async def generate_new_prompts(user_id: str = Depends(get_current_user)):
    """
    Generate new AI-powered reflection prompts for all categories.
    Saves them to the database as user-specific prompts.
    Maps to the "Generate New" button in the frontend.
    """
    try:
        # Generate prompts via LLM
        generated = await generate_prompts()

        # Save all generated prompts
        all_new_prompts = []
        for category, prompt_texts in generated.items():
            for text in prompt_texts:
                all_new_prompts.append({"prompt": text, "category": category})

        saved = prompts_crud.create_many(user_id, all_new_prompts)

        # Return the newly saved prompts grouped
        result = {"growth": [], "gratitude": [], "clarity": [], "stress": []}
        for p in saved:
            cat = p.get("category", "")
            if cat in result:
                result[cat].append(
                    PromptItem(id=p["id"], prompt=p["prompt"], category=p["category"])
                )

        return PromptsResponse(**result)

    except Exception as e:
        logger.error(f"Failed to generate prompts: {e}")
        # Return existing prompts on failure
        return await list_prompts(user_id)
