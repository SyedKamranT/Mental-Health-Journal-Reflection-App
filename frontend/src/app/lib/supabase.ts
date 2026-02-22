/**
 * Supabase client for frontend authentication.
 * Used directly for auth operations (sign up, sign in, sign out, etc.)
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not found. Check your .env file.");
}

export const supabase = createClient(
    supabaseUrl || "",
    supabaseAnonKey || ""
);
