-- ============================================================
-- Study Groups Social Upgrade Migration
-- Adds: pinned messages, invite links, reactions, sessions,
--        challenges, voice note support
-- ============================================================

-- 1. ALTER group_messages: add pinned, audio, duration, expand type
ALTER TABLE group_messages
  ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS audio_url TEXT,
  ADD COLUMN IF NOT EXISTS duration_ms INT;

-- Update type constraint to include 'voice'
ALTER TABLE group_messages DROP CONSTRAINT IF EXISTS group_messages_type_check;
ALTER TABLE group_messages ADD CONSTRAINT group_messages_type_check
  CHECK (type IN ('chat', 'system', 'milestone', 'voice'));

-- 2. ALTER study_groups: add invite code and invites enabled
ALTER TABLE study_groups
  ADD COLUMN IF NOT EXISTS invite_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS invites_enabled BOOLEAN DEFAULT true;

-- 3. CREATE message_reactions
CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- 4. CREATE group_sessions + session_rsvps
CREATE TABLE IF NOT EXISTS group_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  attendee_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS session_rsvps (
  session_id UUID REFERENCES group_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('going', 'not_going')),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (session_id, user_id)
);

-- 5. CREATE group_challenges + challenge_progress
CREATE TABLE IF NOT EXISTS group_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  creator_name TEXT NOT NULL,
  title TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('surah', 'words', 'xp', 'lessons', 'custom')),
  target_value INT NOT NULL,
  current_value INT DEFAULT 0,
  participant_count INT DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS challenge_progress (
  challenge_id UUID REFERENCES group_challenges(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  progress INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (challenge_id, user_id)
);

-- ── Indexes ────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_reactions_message ON message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_reactions_user ON message_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_group ON group_sessions(group_id);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled ON group_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_challenges_group ON group_challenges(group_id);
CREATE INDEX IF NOT EXISTS idx_challenges_active ON group_challenges(is_active, end_date);
CREATE INDEX IF NOT EXISTS idx_challenge_progress_challenge ON challenge_progress(challenge_id);
CREATE INDEX IF NOT EXISTS idx_group_invite_code ON study_groups(invite_code) WHERE invite_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_pinned_messages ON group_messages(group_id, is_pinned) WHERE is_pinned = true;

-- ── RLS ────────────────────────────────────────────────────────
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;

-- message_reactions policies
CREATE POLICY "Anyone can read reactions" ON message_reactions FOR SELECT USING (true);
CREATE POLICY "Auth users can react" ON message_reactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove own reactions" ON message_reactions FOR DELETE USING (auth.uid() = user_id);

-- group_sessions policies
CREATE POLICY "Anyone can read sessions" ON group_sessions FOR SELECT USING (true);
CREATE POLICY "Auth users can create sessions" ON group_sessions FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update sessions" ON group_sessions FOR UPDATE USING (auth.uid() = creator_id);
CREATE POLICY "Creators can delete sessions" ON group_sessions FOR DELETE USING (auth.uid() = creator_id);

-- session_rsvps policies
CREATE POLICY "Anyone can read rsvps" ON session_rsvps FOR SELECT USING (true);
CREATE POLICY "Auth users can rsvp" ON session_rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own rsvp" ON session_rsvps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own rsvp" ON session_rsvps FOR DELETE USING (auth.uid() = user_id);

-- group_challenges policies
CREATE POLICY "Anyone can read challenges" ON group_challenges FOR SELECT USING (true);
CREATE POLICY "Auth users can create challenges" ON group_challenges FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update challenges" ON group_challenges FOR UPDATE USING (auth.uid() = creator_id);

-- challenge_progress policies
CREATE POLICY "Anyone can read progress" ON challenge_progress FOR SELECT USING (true);
CREATE POLICY "Auth users can add progress" ON challenge_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON challenge_progress FOR UPDATE USING (auth.uid() = user_id);

-- ── Triggers ───────────────────────────────────────────────────

-- Auto-update attendee count on session_rsvps
CREATE OR REPLACE FUNCTION update_session_attendee_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE group_sessions SET attendee_count = (
      SELECT COUNT(*) FROM session_rsvps WHERE session_id = NEW.session_id AND status = 'going'
    ) WHERE id = NEW.session_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE group_sessions SET attendee_count = (
      SELECT COUNT(*) FROM session_rsvps WHERE session_id = OLD.session_id AND status = 'going'
    ) WHERE id = OLD.session_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_session_attendee_count
AFTER INSERT OR UPDATE OR DELETE ON session_rsvps
FOR EACH ROW EXECUTE FUNCTION update_session_attendee_count();

-- Auto-update participant count and current value on challenge_progress
CREATE OR REPLACE FUNCTION update_challenge_stats() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE group_challenges SET
      participant_count = (SELECT COUNT(DISTINCT user_id) FROM challenge_progress WHERE challenge_id = NEW.challenge_id),
      current_value = (SELECT COALESCE(SUM(progress), 0) FROM challenge_progress WHERE challenge_id = NEW.challenge_id)
    WHERE id = NEW.challenge_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE group_challenges SET
      participant_count = (SELECT COUNT(DISTINCT user_id) FROM challenge_progress WHERE challenge_id = OLD.challenge_id),
      current_value = (SELECT COALESCE(SUM(progress), 0) FROM challenge_progress WHERE challenge_id = OLD.challenge_id)
    WHERE id = OLD.challenge_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_challenge_stats
AFTER INSERT OR UPDATE OR DELETE ON challenge_progress
FOR EACH ROW EXECUTE FUNCTION update_challenge_stats();
