from openai import AsyncOpenAI
from app.core.config import settings
from typing import Dict, Any

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def analyze_journal_entry(content: str) -> Dict[str, Any]:
    """
    Analyzes a journal entry using OpenAI to provide:
    - Sentiment analysis
    - Key themes
    - Reflection questions
    """
    prompt = f"""
    Analyze the following journal entry and provide:
    1. Sentiment (Positive, Neutral, Negative)
    2. Key themes (list)
    3. Three reflection questions to help the user dig deeper.
    
    Journal Entry:
    "{content}"
    
    Return the response in JSON format.
    """
    
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an empathetic mental health assistant."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        return response.choices[0].message.content
    except Exception as e:
        return {"error": str(e)}
