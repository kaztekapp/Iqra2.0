-- ============================================================
-- USER CREDITS SYSTEM
-- Hybrid model: free daily messages + purchased credits + premium subscription
-- ============================================================

-- Source of truth for user credit balance and subscription status
CREATE TABLE IF NOT EXISTS user_credits (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credit_balance INTEGER NOT NULL DEFAULT 0,
  subscription_status TEXT NOT NULL DEFAULT 'none'
    CHECK (subscription_status IN ('none', 'active', 'expired', 'cancelled')),
  subscription_plan TEXT DEFAULT NULL
    CHECK (subscription_plan IN ('monthly', 'yearly') OR subscription_plan IS NULL),
  subscription_expires_at TIMESTAMPTZ DEFAULT NULL,
  free_messages_used INTEGER NOT NULL DEFAULT 0,
  free_messages_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Immutable audit log for every credit change
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL
    CHECK (transaction_type IN ('purchase', 'consume', 'refund', 'subscription_grant', 'admin_grant')),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credit_transactions_user
  ON credit_transactions (user_id, created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- Users can only SELECT their own rows. All writes go through
-- service_role (edge functions) to prevent client-side manipulation.
-- ============================================================

ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- user_credits: users read own row only
CREATE POLICY "Users can read own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- user_credits: service role full access
CREATE POLICY "Service role full access on credits"
  ON user_credits FOR ALL
  USING (auth.role() = 'service_role');

-- credit_transactions: users read own rows only
CREATE POLICY "Users can read own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- credit_transactions: service role full access
CREATE POLICY "Service role full access on transactions"
  ON credit_transactions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- RPC: check_and_deduct_credit
-- Atomic credit check + deduction with row-level locking.
-- Returns JSON: { result, remaining_credits, free_remaining }
-- ============================================================

CREATE OR REPLACE FUNCTION public.check_and_deduct_credit(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_row user_credits%ROWTYPE;
  v_today DATE := CURRENT_DATE;
  v_free_limit CONSTANT INTEGER := 5;
BEGIN
  -- Lock the row for atomic read-modify-write
  SELECT * INTO v_row
  FROM user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Auto-create row if missing (e.g. user signed up before migration)
  IF NOT FOUND THEN
    INSERT INTO user_credits (user_id) VALUES (p_user_id);
    SELECT * INTO v_row FROM user_credits WHERE user_id = p_user_id FOR UPDATE;
  END IF;

  -- 1. Premium subscribers get unlimited access
  IF v_row.subscription_status = 'active'
     AND (v_row.subscription_expires_at IS NULL OR v_row.subscription_expires_at > NOW()) THEN
    RETURN json_build_object(
      'result', 'unlimited',
      'remaining_credits', v_row.credit_balance,
      'free_remaining', v_free_limit
    );
  END IF;

  -- Mark expired subscriptions
  IF v_row.subscription_status = 'active'
     AND v_row.subscription_expires_at IS NOT NULL
     AND v_row.subscription_expires_at <= NOW() THEN
    UPDATE user_credits SET subscription_status = 'expired', updated_at = NOW()
    WHERE user_id = p_user_id;
  END IF;

  -- 2. Reset free counter if new day
  IF v_row.free_messages_date <> v_today THEN
    UPDATE user_credits
    SET free_messages_used = 0, free_messages_date = v_today, updated_at = NOW()
    WHERE user_id = p_user_id;
    v_row.free_messages_used := 0;
  END IF;

  -- 3. Free messages available
  IF v_row.free_messages_used < v_free_limit THEN
    UPDATE user_credits
    SET free_messages_used = free_messages_used + 1, updated_at = NOW()
    WHERE user_id = p_user_id;

    RETURN json_build_object(
      'result', 'free',
      'remaining_credits', v_row.credit_balance,
      'free_remaining', v_free_limit - v_row.free_messages_used - 1
    );
  END IF;

  -- 4. Purchased credits available
  IF v_row.credit_balance > 0 THEN
    UPDATE user_credits
    SET credit_balance = credit_balance - 1, updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Log the transaction
    INSERT INTO credit_transactions (user_id, transaction_type, amount, balance_after, description)
    VALUES (p_user_id, 'consume', -1, v_row.credit_balance - 1, 'AI message');

    RETURN json_build_object(
      'result', 'credit',
      'remaining_credits', v_row.credit_balance - 1,
      'free_remaining', 0
    );
  END IF;

  -- 5. No credits remaining
  RETURN json_build_object(
    'result', 'insufficient',
    'remaining_credits', 0,
    'free_remaining', 0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- UPDATE handle_new_user() TO ALSO CREATE user_credits ROW
-- ============================================================

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
  INSERT INTO public.user_credits (user_id) VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
