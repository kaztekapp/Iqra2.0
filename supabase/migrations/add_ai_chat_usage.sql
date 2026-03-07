-- AI Chat usage tracking for rate limiting
CREATE TABLE IF NOT EXISTS ai_chat_usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, usage_date)
);

-- RLS: users can only read/write their own rows
ALTER TABLE ai_chat_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own usage"
  ON ai_chat_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON ai_chat_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON ai_chat_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role bypass for edge function
CREATE POLICY "Service role full access"
  ON ai_chat_usage FOR ALL
  USING (auth.role() = 'service_role');

-- Index for fast daily lookups
CREATE INDEX IF NOT EXISTS idx_ai_chat_usage_date
  ON ai_chat_usage (user_id, usage_date);
