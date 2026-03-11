-- ============================================================
-- RPC: grant_credits
-- Called by the RevenueCat webhook to add purchased credits.
-- Uses service_role so it bypasses RLS.
-- ============================================================

CREATE OR REPLACE FUNCTION public.grant_credits(
  p_user_id UUID,
  p_amount INTEGER,
  p_description TEXT DEFAULT 'Credit purchase'
)
RETURNS JSON AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- Upsert: create row if missing (e.g. user signed up before migration)
  INSERT INTO user_credits (user_id, credit_balance)
  VALUES (p_user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  -- Atomically add credits
  UPDATE user_credits
  SET credit_balance = credit_balance + p_amount, updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING credit_balance INTO v_new_balance;

  -- Log the transaction
  INSERT INTO credit_transactions (user_id, transaction_type, amount, balance_after, description)
  VALUES (p_user_id, 'purchase', p_amount, v_new_balance, p_description);

  RETURN json_build_object('balance', v_new_balance);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
