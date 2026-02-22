-- ============================================================
-- Mental Health Journal & Reflection App - Supabase Schema
-- ============================================================
-- Run this entire file in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE
-- Extends auth.users with app-specific fields
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- 2. USER PREFERENCES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    ai_processing BOOLEAN DEFAULT TRUE,
    usage_analytics BOOLEAN DEFAULT FALSE,
    dark_mode BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create preferences on new profile
CREATE OR REPLACE FUNCTION handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created ON profiles;
CREATE TRIGGER on_profile_created
    AFTER INSERT ON profiles
    FOR EACH ROW EXECUTE FUNCTION handle_new_profile();

-- RLS for user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 3. JOURNAL ENTRIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    word_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_created ON journal_entries(user_id, created_at DESC);

-- RLS for journal_entries
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entries" ON journal_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entries" ON journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries" ON journal_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries" ON journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 4. ENTRY ANALYSES TABLE
-- LLM-generated analysis per journal entry
-- ============================================================
CREATE TABLE IF NOT EXISTS entry_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entry_id UUID UNIQUE NOT NULL REFERENCES journal_entries(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    summary TEXT,
    themes TEXT[] DEFAULT '{}',
    emotional_scores JSONB DEFAULT '{"calm": 50, "energy": 50, "clarity": 50}',
    reflective_questions TEXT[] DEFAULT '{}',
    sentiment TEXT DEFAULT 'Neutral',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_entry_analyses_entry_id ON entry_analyses(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_analyses_user_id ON entry_analyses(user_id);

-- RLS for entry_analyses
ALTER TABLE entry_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analyses" ON entry_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON entry_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON entry_analyses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON entry_analyses
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 5. WEEKLY INSIGHTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS weekly_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    observations TEXT[] DEFAULT '{}',
    reflection_suggestion TEXT,
    theme_distribution JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, period_start)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_weekly_insights_user_period ON weekly_insights(user_id, period_start DESC);

-- RLS for weekly_insights
ALTER TABLE weekly_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own insights" ON weekly_insights
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own insights" ON weekly_insights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own insights" ON weekly_insights
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own insights" ON weekly_insights
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 6. REFLECTION PROMPTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reflection_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('growth', 'gratitude', 'clarity', 'stress')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reflection_prompts_category ON reflection_prompts(user_id, category);

-- RLS for reflection_prompts
ALTER TABLE reflection_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prompts" ON reflection_prompts
    FOR SELECT USING (auth.uid() = user_id OR is_default = TRUE);

CREATE POLICY "Users can insert own prompts" ON reflection_prompts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts" ON reflection_prompts
    FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 7. SEED DEFAULT REFLECTION PROMPTS
-- ============================================================
INSERT INTO reflection_prompts (user_id, prompt, category, is_default) VALUES
    -- Growth
    (NULL, 'What''s one small step you could take today toward a goal that matters to you?', 'growth', TRUE),
    (NULL, 'Reflect on a challenge you overcame recently. What did you learn about yourself?', 'growth', TRUE),
    (NULL, 'Where do you see yourself growing in the next three months? What would that feel like?', 'growth', TRUE),
    -- Gratitude
    (NULL, 'What''s something small that brought you joy today?', 'gratitude', TRUE),
    (NULL, 'Who has shown you kindness recently, and how did it impact you?', 'gratitude', TRUE),
    (NULL, 'What part of your daily routine are you most grateful for?', 'gratitude', TRUE),
    -- Clarity
    (NULL, 'What does balance mean to you right now? Where do you feel it, and where is it missing?', 'clarity', TRUE),
    (NULL, 'If you could tell your past self something, what would it be?', 'clarity', TRUE),
    (NULL, 'What are you holding onto that no longer serves you?', 'clarity', TRUE),
    -- Stress & Release
    (NULL, 'What''s weighing on your mind today? Write it out without judgment.', 'stress', TRUE),
    (NULL, 'When do you feel most at peace? How can you create more of those moments?', 'stress', TRUE),
    (NULL, 'What''s one thing you can let go of this week to lighten your load?', 'stress', TRUE);

-- ============================================================
-- 8. UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_journal_entries_updated_at
    BEFORE UPDATE ON journal_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
