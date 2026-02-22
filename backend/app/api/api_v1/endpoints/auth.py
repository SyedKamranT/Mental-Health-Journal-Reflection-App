"""Authentication endpoints — register, login, reset-password, logout, me."""

from fastapi import APIRouter, HTTPException, status, Depends
from app.core.database import supabase
from app.core.auth import get_current_user
from app.schemas.auth import (
    LoginRequest, RegisterRequest, ResetPasswordRequest,
    AuthResponse, UserResponse,
)
from app.crud.crud_settings import settings_crud
import logging

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/register", response_model=AuthResponse)
async def register(body: RegisterRequest):
    """Register a new user via Supabase Auth."""
    try:
        response = supabase.auth.sign_up({
            "email": body.email,
            "password": body.password,
            "options": {
                "data": {"name": body.name},
            },
        })

        if not response.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed. Please try again.",
            )

        return AuthResponse(
            user=UserResponse(
                id=str(response.user.id),
                email=response.user.email or body.email,
                name=body.name,
            ),
            access_token=response.session.access_token if response.session else "",
            refresh_token=response.session.refresh_token if response.session else None,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.post("/login", response_model=AuthResponse)
async def login(body: LoginRequest):
    """Authenticate a user via Supabase Auth."""
    try:
        response = supabase.auth.sign_in_with_password({
            "email": body.email,
            "password": body.password,
        })

        if not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        # Get profile name
        profile = settings_crud.get_profile(str(response.user.id))
        name = profile.get("name", "") if profile else ""

        return AuthResponse(
            user=UserResponse(
                id=str(response.user.id),
                email=response.user.email or body.email,
                name=name,
            ),
            access_token=response.session.access_token if response.session else "",
            refresh_token=response.session.refresh_token if response.session else None,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )


@router.post("/reset-password")
async def reset_password(body: ResetPasswordRequest):
    """Send a password reset email via Supabase Auth."""
    try:
        supabase.auth.reset_password_email(body.email)
        return {"message": "If an account exists with this email, a reset link has been sent."}
    except Exception as e:
        logger.error(f"Reset password error: {e}")
        # Always return success to avoid email enumeration
        return {"message": "If an account exists with this email, a reset link has been sent."}


@router.post("/logout")
async def logout(user_id: str = Depends(get_current_user)):
    """Sign out the current user."""
    try:
        supabase.auth.sign_out()
    except Exception:
        pass  # Sign out is best-effort
    return {"message": "Logged out successfully."}


@router.get("/me", response_model=UserResponse)
async def get_me(user_id: str = Depends(get_current_user)):
    """Get the current authenticated user."""
    profile = settings_crud.get_profile(user_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found.",
        )
    return UserResponse(
        id=user_id,
        email=profile.get("email", ""),
        name=profile.get("name", ""),
    )
