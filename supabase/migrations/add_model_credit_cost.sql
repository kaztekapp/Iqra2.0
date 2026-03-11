-- ============================================================
-- UPDATE check_and_deduct_credit TO SUPPORT MODEL-BASED COSTS
-- Haiku = 1 credit, Sonnet = 3 credits
-- ============================================================

CREATE OR REPLACE FUNCTION public.check_and_deduct_credit(p_user_id UUID, p_model VARCHAR DEFAULT 'haiku')
RETURNS JSON AS $$
DECLARE
  v_row user_credits%ROWTYPE;
  v_today DATE := CURRENT_DATE;
  v_free_limit CONSTANT INTEGER := 5;
  v_cost INTEGER;
BEGIN
  -- Validate model parameter (only allow known values)
  IF p_model NOT IN ('haiku', 'sonnet') THEN
    p_model := 'haiku';
  END IF;

  -- Determine cost based on model
  v_cost := CASE WHEN p_model = 'sonnet' THEN 3 ELSE 1 END;

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

  -- 3. Free messages available (1 free use per message, model irrelevant)
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

  -- 4. Purchased credits available (model determines cost)
  IF v_row.credit_balance >= v_cost THEN
    UPDATE user_credits
    SET credit_balance = credit_balance - v_cost, updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Log the transaction
    INSERT INTO credit_transactions (user_id, transaction_type, amount, balance_after, description)
    VALUES (p_user_id, 'consume', -v_cost, v_row.credit_balance - v_cost, 'AI message (' || p_model || ')');

    RETURN json_build_object(
      'result', 'credit',
      'remaining_credits', v_row.credit_balance - v_cost,
      'free_remaining', 0
    );
  END IF;

  -- 5. No credits remaining
  RETURN json_build_object(
    'result', 'insufficient',
    'remaining_credits', v_row.credit_balance,
    'free_remaining', 0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- RPC: refund_message_credit
-- Reverses a deduction when the AI service fails after billing.
-- p_credit_type: 'free' or 'credit' (matches check_and_deduct_credit result)
-- p_cost: number of credits to refund (only used when p_credit_type = 'credit')
-- ============================================================

CREATE OR REPLACE FUNCTION public.refund_message_credit(
  p_user_id UUID,
  p_credit_type VARCHAR,
  p_cost INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
  IF p_credit_type = 'free' THEN
    UPDATE user_credits
    SET free_messages_used = GREATEST(free_messages_used - 1, 0),
        updated_at = NOW()
    WHERE user_id = p_user_id;

  ELSIF p_credit_type = 'credit' THEN
    UPDATE user_credits
    SET credit_balance = credit_balance + p_cost,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    INSERT INTO credit_transactions (user_id, transaction_type, amount, balance_after, description)
    SELECT p_user_id, 'refund', p_cost, credit_balance, 'Refund: AI service error'
    FROM user_credits
    WHERE user_id = p_user_id;
  END IF;
  -- 'unlimited' needs no refund
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
