-- Migration: Add public-read RLS policies for leaderboard & community stats
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- 1. Allow all authenticated users to read profiles (display_name, avatar) for leaderboard
CREATE POLICY "Users can view all profiles for leaderboard"
  ON public.user_profiles FOR SELECT
  USING (true);

-- 2. Allow all authenticated users to read arabic progress (XP, streaks) for leaderboard
CREATE POLICY "Users can view all progress for leaderboard"
  ON public.user_arabic_progress FOR SELECT
  USING (true);

-- 3. Allow all authenticated users to read daily log for community stats & weekly leaderboard
CREATE POLICY "Users can view all daily logs for leaderboard"
  ON public.user_daily_log FOR SELECT
  USING (true);
