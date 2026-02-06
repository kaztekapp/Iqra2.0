-- ============================================================
-- Iqra 2.0 — Supabase Database Schema
-- ============================================================
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- This creates all tables, RLS policies, indexes, and triggers.
-- ============================================================

-- ========================
-- 1. USER PROFILES
-- ========================
-- Core user info, settings, and learning goals.
-- Created automatically on signup via trigger.

CREATE TABLE public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'fr')),
  learning_goals TEXT[] DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);


-- ========================
-- 2. ARABIC LEARNING PROGRESS
-- ========================
-- Tracks alphabet, vocabulary, grammar, verbs, reading, exercises.
-- Stored as JSONB to mirror the local Zustand store structure.

CREATE TABLE public.user_arabic_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  total_xp INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date TIMESTAMPTZ,
  alphabet_progress JSONB DEFAULT '{"lettersLearned":[],"writingPracticed":[],"masteredLetters":[]}',
  vocabulary_progress JSONB DEFAULT '{"themesStarted":[],"themesCompleted":[],"wordsLearned":[],"wordsMastered":[]}',
  grammar_progress JSONB DEFAULT '{"lessonsStarted":[],"lessonsCompleted":[]}',
  verb_progress JSONB DEFAULT '{"verbsLearned":[],"verbsMastered":[],"tensesReviewed":{"past":false,"present":false,"future":false}}',
  reading_progress JSONB DEFAULT '{"textsStarted":[],"textsCompleted":[]}',
  exercise_results JSONB DEFAULT '{"totalCompleted":0,"totalCorrect":0,"byType":{}}',
  show_vowels BOOLEAN DEFAULT true,
  last_accessed JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_arabic_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own arabic progress"
  ON public.user_arabic_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own arabic progress"
  ON public.user_arabic_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own arabic progress"
  ON public.user_arabic_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ========================
-- 3. QURAN PROGRESS
-- ========================
-- Surah progress, tajweed, memorization, and Quran settings.

CREATE TABLE public.user_quran_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  surah_progress JSONB DEFAULT '{}',
  tajweed_progress JSONB DEFAULT '{"rulesLearned":[],"rulesMastered":[],"practiceCount":{},"accuracy":{}}',
  memorization_progress JSONB DEFAULT '{"totalAyahsMemorized":0,"totalSurahsMemorized":0,"currentStreak":0,"longestStreak":0,"reviewSchedule":[],"lastReviewDate":null}',
  quran_settings JSONB DEFAULT '{"reciterId":"ar.alafasy","playbackSpeed":1,"repeatCount":1,"showTransliteration":true,"showTranslation":true,"showTajweedColors":true,"autoAdvance":true,"wordByWordMode":false}',
  last_study_date TIMESTAMPTZ,
  total_study_time INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_quran_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quran progress"
  ON public.user_quran_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own quran progress"
  ON public.user_quran_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quran progress"
  ON public.user_quran_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ========================
-- 4. DUAS PROGRESS
-- ========================

CREATE TABLE public.user_duas_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  favorites TEXT[] DEFAULT '{}',
  memorized TEXT[] DEFAULT '{}',
  last_viewed_dua_id TEXT,
  last_viewed_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_duas_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own duas progress"
  ON public.user_duas_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own duas progress"
  ON public.user_duas_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own duas progress"
  ON public.user_duas_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ========================
-- 5. PRAYER PROGRESS
-- ========================

CREATE TABLE public.user_prayer_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  lessons_completed TEXT[] DEFAULT '{}',
  lessons_started TEXT[] DEFAULT '{}',
  last_viewed_lesson_id TEXT,
  last_viewed_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_prayer_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own prayer progress"
  ON public.user_prayer_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own prayer progress"
  ON public.user_prayer_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prayer progress"
  ON public.user_prayer_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ========================
-- 6. STORIES PROGRESS
-- ========================
-- Prophet stories + Quran stories combined.

CREATE TABLE public.user_stories_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  prophet_stories JSONB DEFAULT '{"storiesProgress":{},"totalStoriesCompleted":0,"lastReadProphetId":null,"lastReadDate":null,"totalReadingTime":0,"audioSettings":{"playbackSpeed":1,"autoPlay":false,"highlightCurrentBlock":true}}',
  quran_stories JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_stories_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stories progress"
  ON public.user_stories_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own stories progress"
  ON public.user_stories_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stories progress"
  ON public.user_stories_progress FOR UPDATE
  USING (auth.uid() = user_id);


-- ========================
-- 7. QUIZ STATS
-- ========================
-- Normalized for leaderboards and community features.

CREATE TABLE public.user_quiz_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  -- Arabic quiz
  arabic_attempts INTEGER DEFAULT 0,
  arabic_best_score INTEGER DEFAULT 0,
  arabic_quizzes_passed INTEGER DEFAULT 0,
  arabic_correct_answers INTEGER DEFAULT 0,
  arabic_best_streak INTEGER DEFAULT 0,
  arabic_words_learned TEXT[] DEFAULT '{}',
  -- Grammar quiz
  grammar_attempts INTEGER DEFAULT 0,
  grammar_best_score INTEGER DEFAULT 0,
  grammar_quizzes_passed INTEGER DEFAULT 0,
  grammar_correct_answers INTEGER DEFAULT 0,
  grammar_questions_attempted INTEGER DEFAULT 0,
  grammar_best_streak INTEGER DEFAULT 0,
  grammar_categories_completed TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_quiz_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quiz stats"
  ON public.user_quiz_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own quiz stats"
  ON public.user_quiz_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz stats"
  ON public.user_quiz_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow reading other users' stats for leaderboards
CREATE POLICY "Users can view all quiz stats for leaderboard"
  ON public.user_quiz_stats FOR SELECT
  USING (true);


-- ========================
-- 8. ACHIEVEMENTS
-- ========================
-- Individual achievement unlock records.

CREATE TABLE public.user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON public.user_achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON public.user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow reading others' achievements for community
CREATE POLICY "Users can view all achievements"
  ON public.user_achievements FOR SELECT
  USING (true);


-- ========================
-- 9. SPACED REPETITION SCHEDULE
-- ========================
-- SM-2 review items for vocabulary and Quran memorization.

CREATE TABLE public.user_review_schedule (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('vocabulary', 'quran_ayah')),
  item_id TEXT NOT NULL,
  group_id TEXT,
  next_review_date TIMESTAMPTZ NOT NULL,
  ease_factor NUMERIC(4,2) DEFAULT 2.50,
  interval_days INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0,
  last_rating INTEGER CHECK (last_rating BETWEEN 0 AND 5),
  last_reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

ALTER TABLE public.user_review_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own review schedule"
  ON public.user_review_schedule FOR ALL
  USING (auth.uid() = user_id);


-- ========================
-- 10. COMMUNITY CONTRIBUTIONS
-- ========================

CREATE TABLE public.user_community_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  daily_contribution JSONB DEFAULT '{}',
  weekly_contribution JSONB DEFAULT '{}',
  challenge_last_updated TIMESTAMPTZ,
  total_community_xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_community_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own community stats"
  ON public.user_community_stats FOR ALL
  USING (auth.uid() = user_id);

-- Allow reading for community leaderboard
CREATE POLICY "Users can view all community stats"
  ON public.user_community_stats FOR SELECT
  USING (true);


-- ========================
-- 11. DAILY STREAKS LOG
-- ========================
-- One row per active day for streak calculation.

CREATE TABLE public.user_daily_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_date DATE NOT NULL DEFAULT CURRENT_DATE,
  xp_earned INTEGER DEFAULT 0,
  minutes_studied INTEGER DEFAULT 0,
  modules_accessed TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, study_date)
);

ALTER TABLE public.user_daily_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own daily log"
  ON public.user_daily_log FOR ALL
  USING (auth.uid() = user_id);


-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_arabic_progress_user ON public.user_arabic_progress(user_id);
CREATE INDEX idx_quran_progress_user ON public.user_quran_progress(user_id);
CREATE INDEX idx_achievements_user ON public.user_achievements(user_id);
CREATE INDEX idx_review_schedule_user_date ON public.user_review_schedule(user_id, next_review_date);
CREATE INDEX idx_review_schedule_type ON public.user_review_schedule(user_id, item_type);
CREATE INDEX idx_daily_log_user_date ON public.user_daily_log(user_id, study_date DESC);
CREATE INDEX idx_quiz_stats_arabic_score ON public.user_quiz_stats(arabic_best_score DESC);
CREATE INDEX idx_quiz_stats_grammar_score ON public.user_quiz_stats(grammar_best_score DESC);


-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update `updated_at` on any table with that column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_arabic_progress
  BEFORE UPDATE ON public.user_arabic_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_quran_progress
  BEFORE UPDATE ON public.user_quran_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_duas_progress
  BEFORE UPDATE ON public.user_duas_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_prayer_progress
  BEFORE UPDATE ON public.user_prayer_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_stories_progress
  BEFORE UPDATE ON public.user_stories_progress
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_quiz_stats
  BEFORE UPDATE ON public.user_quiz_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_community_stats
  BEFORE UPDATE ON public.user_community_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ============================================================
-- AUTO-CREATE PROFILE + PROGRESS ROWS ON SIGNUP
-- ============================================================
-- This trigger fires when a new user signs up via Supabase Auth.
-- It creates empty rows in all progress tables so upserts work.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );

  INSERT INTO public.user_arabic_progress (user_id) VALUES (NEW.id);
  INSERT INTO public.user_quran_progress (user_id) VALUES (NEW.id);
  INSERT INTO public.user_duas_progress (user_id) VALUES (NEW.id);
  INSERT INTO public.user_prayer_progress (user_id) VALUES (NEW.id);
  INSERT INTO public.user_stories_progress (user_id) VALUES (NEW.id);
  INSERT INTO public.user_quiz_stats (user_id) VALUES (NEW.id);
  INSERT INTO public.user_community_stats (user_id) VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- LEADERBOARD VIEW
-- ============================================================
-- Prebuilt view for easy leaderboard queries.

CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  p.user_id,
  p.display_name,
  p.avatar_url,
  ap.total_xp,
  ap.current_streak,
  ap.longest_streak,
  qs.arabic_best_score,
  qs.grammar_best_score,
  qs.arabic_quizzes_passed + qs.grammar_quizzes_passed AS total_quizzes_passed,
  cs.total_community_xp
FROM public.user_profiles p
LEFT JOIN public.user_arabic_progress ap ON ap.user_id = p.user_id
LEFT JOIN public.user_quiz_stats qs ON qs.user_id = p.user_id
LEFT JOIN public.user_community_stats cs ON cs.user_id = p.user_id
ORDER BY ap.total_xp DESC NULLS LAST;


-- ============================================================
-- DONE
-- ============================================================
-- Next steps:
-- 1. Run this script in Supabase SQL Editor
-- 2. Add your Supabase URL and anon key to .env:
--      EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
--      EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
-- 3. Remove the temporary reset code from app/_layout.tsx
-- 4. (Optional) Enable Google/Apple OAuth in Supabase Auth settings
