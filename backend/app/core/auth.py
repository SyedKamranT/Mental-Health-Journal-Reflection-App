"""
Authentication middleware — verifies Supabase JWT tokens.
Uses the Supabase client's auth.get_user() for token verification,
which handles both HS256 and ES256 algorithms automatically.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.database import supabase_admin

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    """
    Verify the Supabase access token and return the user ID.
    Uses supabase_admin.auth.get_user() which handles all JWT algorithms.
    """
    token = credentials.credentials

    try:
        # Use Supabase's built-in token verification
        response = supabase_admin.auth.get_user(token)
        if not response or not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication token",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return response.user.id
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
