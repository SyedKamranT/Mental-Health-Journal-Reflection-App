"""
Supabase client instances.

- `supabase`: uses the anon key (respects RLS, used for user-scoped operations)
- `supabase_admin`: uses the service role key (bypasses RLS, for admin operations)
"""

from supabase import create_client, Client
from app.core.config import settings

# Anon client — respects RLS policies
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Service role client — bypasses RLS (for admin operations like bulk delete)
supabase_admin: Client = create_client(
    settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY
)
