-- Drop if re-running
DROP TABLE IF EXISTS discussion_likes CASCADE;
DROP TABLE IF EXISTS discussion_replies CASCADE;
DROP TABLE IF EXISTS discussion_threads CASCADE;
DROP TABLE IF EXISTS study_group_members CASCADE;
DROP TABLE IF EXISTS study_groups CASCADE;
DROP TABLE IF EXISTS study_partner_connections CASCADE;
DROP TABLE IF EXISTS activity_feed CASCADE;
DROP FUNCTION IF EXISTS update_thread_reply_count CASCADE;
DROP FUNCTION IF EXISTS update_group_member_count CASCADE;

-- 1. Discussion threads
CREATE TABLE discussion_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('general','quran','arabic','prayer','tips')),
  reply_count INT DEFAULT 0,
  like_count INT DEFAULT 0,
  is_pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Discussion replies
CREATE TABLE discussion_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES discussion_threads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,
  like_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Discussion likes
CREATE TABLE discussion_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  thread_id UUID REFERENCES discussion_threads(id) ON DELETE CASCADE,
  reply_id UUID REFERENCES discussion_replies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_unique_thread_like ON discussion_likes(user_id, thread_id) WHERE thread_id IS NOT NULL;
CREATE UNIQUE INDEX idx_unique_reply_like ON discussion_likes(user_id, reply_id) WHERE reply_id IS NOT NULL;

-- 4. Study groups
CREATE TABLE study_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  topic TEXT NOT NULL,
  goal TEXT NOT NULL,
  icon TEXT DEFAULT 'book',
  color TEXT DEFAULT '#10b981',
  max_members INT DEFAULT 50,
  member_count INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Study group members
CREATE TABLE study_group_members (
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- 6. Study partner connections
CREATE TABLE study_partner_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  target_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(requester_id, target_id)
);

-- 7. Activity feed
CREATE TABLE activity_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('completed_surah','streak','joined_group','earned_xp','discussion_post')),
  detail TEXT NOT NULL,
  icon TEXT DEFAULT 'star',
  color TEXT DEFAULT '#10b981',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_threads_category ON discussion_threads(category);
CREATE INDEX idx_threads_created ON discussion_threads(created_at DESC);
CREATE INDEX idx_replies_thread ON discussion_replies(thread_id);
CREATE INDEX idx_group_members_user ON study_group_members(user_id);
CREATE INDEX idx_partner_connections ON study_partner_connections(requester_id, target_id);
CREATE INDEX idx_activity_feed_created ON activity_feed(created_at DESC);

-- RLS
ALTER TABLE discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_partner_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_feed ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read threads" ON discussion_threads FOR SELECT USING (true);
CREATE POLICY "Auth users can create threads" ON discussion_threads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own threads" ON discussion_threads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own threads" ON discussion_threads FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read replies" ON discussion_replies FOR SELECT USING (true);
CREATE POLICY "Auth users can create replies" ON discussion_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own replies" ON discussion_replies FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read likes" ON discussion_likes FOR SELECT USING (true);
CREATE POLICY "Auth users can like" ON discussion_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON discussion_likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read groups" ON study_groups FOR SELECT USING (true);
CREATE POLICY "Auth users can create groups" ON study_groups FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update groups" ON study_groups FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Anyone can read members" ON study_group_members FOR SELECT USING (true);
CREATE POLICY "Auth users can join" ON study_group_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave" ON study_group_members FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own connections" ON study_partner_connections FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = target_id);
CREATE POLICY "Auth users can request" ON study_partner_connections FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update own connections" ON study_partner_connections FOR UPDATE USING (auth.uid() = target_id OR auth.uid() = requester_id);
CREATE POLICY "Users can delete own connections" ON study_partner_connections FOR DELETE USING (auth.uid() = requester_id OR auth.uid() = target_id);

CREATE POLICY "Anyone can read activity" ON activity_feed FOR SELECT USING (true);
CREATE POLICY "Auth users can post activity" ON activity_feed FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_thread_reply_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE discussion_threads SET reply_count = reply_count + 1 WHERE id = NEW.thread_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE discussion_threads SET reply_count = GREATEST(reply_count - 1, 0) WHERE id = OLD.thread_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reply_count
AFTER INSERT OR DELETE ON discussion_replies
FOR EACH ROW EXECUTE FUNCTION update_thread_reply_count();

CREATE OR REPLACE FUNCTION update_group_member_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE study_groups SET member_count = member_count + 1 WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE study_groups SET member_count = GREATEST(member_count - 1, 0) WHERE id = OLD.group_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_member_count
AFTER INSERT OR DELETE ON study_group_members
FOR EACH ROW EXECUTE FUNCTION update_group_member_count();
