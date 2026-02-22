/**
 * API client for communicating with the FastAPI backend.
 * Automatically attaches the Supabase JWT token to all requests.
 */

import { supabase } from "./supabase";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

async function getAuthHeaders(): Promise<Record<string, string>> {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: { ...headers, ...(options.headers as Record<string, string>) },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: "Request failed" }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

// ─── Auth ────────────────────────────────────────────────────

export const authApi = {
    me: () => request<{ id: string; email: string; name: string }>("/auth/me"),
};

// ─── Journal ─────────────────────────────────────────────────

export interface JournalAnalysis {
    id: string;
    entry_id: string;
    summary: string | null;
    themes: string[];
    emotional_scores: { calm: number; energy: number; clarity: number };
    reflective_questions: string[];
    sentiment: string;
}

export interface JournalEntry {
    id: string;
    user_id: string;
    content: string;
    word_count: number;
    created_at: string;
    updated_at: string | null;
    analysis: JournalAnalysis | null;
}

export interface JournalListItem {
    id: string;
    date: string;
    preview: string;
    themes: string[];
    wordCount: number;
}

export interface JournalListResponse {
    entries: JournalListItem[];
    total: number;
    page: number;
    limit: number;
}

export interface JournalCreateResponse {
    entry: JournalEntry;
    analysis: JournalAnalysis | null;
}

export const journalApi = {
    create: (content: string) =>
        request<JournalCreateResponse>("/journal/", {
            method: "POST",
            body: JSON.stringify({ content }),
        }),

    list: (params?: { search?: string; page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.search) query.set("search", params.search);
        if (params?.page) query.set("page", String(params.page));
        if (params?.limit) query.set("limit", String(params.limit));
        const qs = query.toString();
        return request<JournalListResponse>(`/journal/${qs ? `?${qs}` : ""}`);
    },

    get: (id: string) => request<JournalEntry>(`/journal/${id}`),

    update: (id: string, content: string) =>
        request<JournalEntry>(`/journal/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ content }),
        }),

    delete: (id: string) =>
        request<{ message: string }>(`/journal/${id}`, { method: "DELETE" }),
};

// ─── Dashboard ───────────────────────────────────────────────

export interface EmotionalTrendPoint {
    day: string;
    calm: number;
    energy: number;
    clarity: number;
}

export interface DashboardData {
    is_first_time: boolean;
    streak_days: number;
    streak_message: string;
    monthly_entries: number;
    monthly_average: number;
    growth_percentage: number;
    growth_message: string;
    emotional_trend: EmotionalTrendPoint[];
    recent_prompt: string | null;
    recent_pattern: string | null;
}

export const dashboardApi = {
    get: () => request<DashboardData>("/dashboard/"),
};

// ─── Insights ────────────────────────────────────────────────

export interface ThemeDistItem {
    theme: string;
    count: number;
}

export interface InsightsData {
    emotional_trends: EmotionalTrendPoint[];
    theme_distribution: ThemeDistItem[];
    weekly_summary: { observations: string[]; reflection_suggestion: string | null } | null;
    period: string;
    has_data: boolean;
}

export const insightsApi = {
    get: (period: string = "weekly") =>
        request<InsightsData>(`/insights/?period=${period}`),
};

// ─── Prompts ─────────────────────────────────────────────────

export interface PromptItem {
    id: string;
    prompt: string;
    category: string;
}

export interface PromptsData {
    growth: PromptItem[];
    gratitude: PromptItem[];
    clarity: PromptItem[];
    stress: PromptItem[];
}

export const promptsApi = {
    list: () => request<PromptsData>("/prompts/"),
    generate: () => request<PromptsData>("/prompts/generate", { method: "POST" }),
};

// ─── Settings ────────────────────────────────────────────────

export interface ProfileData {
    name: string | null;
    email: string | null;
}

export interface PreferencesData {
    ai_processing: boolean;
    usage_analytics: boolean;
    dark_mode: boolean;
}

export const settingsApi = {
    getProfile: () => request<ProfileData>("/settings/profile"),
    updateProfile: (data: Partial<ProfileData>) =>
        request<ProfileData>("/settings/profile", {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    getPreferences: () => request<PreferencesData>("/settings/preferences"),
    updatePreferences: (data: Partial<PreferencesData>) =>
        request<PreferencesData>("/settings/preferences", {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    exportData: () => request<any>("/settings/export"),
    deleteData: () =>
        request<{ message: string }>("/settings/data", { method: "DELETE" }),
};
