-- ============================================================
-- PUSH NOTIFICATIONS FOR GROUP MESSAGES
--
-- A message must reach people whose app is closed, and only a server can
-- wake a closed app. This adds the three things that makes possible:
--
--   push_tokens      one row per device, so the server knows where to send
--   members.muted    a member who wants a quiet group
--   messages.notified_at  a message is pushed once, however often it is asked for
--
-- The sending itself is the notify-group-message Edge Function.
-- ============================================================

-- 1. Devices ---------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.push_tokens (
  token       TEXT PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform    TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  -- Which language to write the notification in. The phone knows; the server
  -- would otherwise have to guess, and a French user would read English.
  lang        TEXT NOT NULL DEFAULT 'en' CHECK (lang IN ('en', 'fr')),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON public.push_tokens(user_id);

ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;

-- A device row belongs to the person signed in on it, and to nobody else:
-- the fan-out reads these with the service role, which bypasses RLS.
DROP POLICY IF EXISTS "Users manage own push tokens" ON public.push_tokens;
CREATE POLICY "Users manage own push tokens" ON public.push_tokens
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. A group can be muted --------------------------------------------------

ALTER TABLE public.study_group_members
  ADD COLUMN IF NOT EXISTS muted BOOLEAN DEFAULT false;

-- The existing "Anyone can read members" / "Auth users can join" policies
-- cover SELECT and INSERT; muting is an UPDATE of one's own membership row,
-- which nothing granted until now.
DROP POLICY IF EXISTS "Members can update own membership" ON public.study_group_members;
CREATE POLICY "Members can update own membership" ON public.study_group_members
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Push a message once ---------------------------------------------------

ALTER TABLE public.group_messages
  ADD COLUMN IF NOT EXISTS notified_at TIMESTAMPTZ;
