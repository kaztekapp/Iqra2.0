-- Atomic upsert for daily XP logging.
-- Replaces the SELECT + INSERT/UPDATE pair with a single statement.
create or replace function upsert_daily_xp(
  p_user_id uuid,
  p_study_date date,
  p_xp_amount int
)
returns void
language sql
security definer
as $$
  insert into user_daily_log (user_id, study_date, xp_earned)
  values (p_user_id, p_study_date, p_xp_amount)
  on conflict (user_id, study_date)
  do update set xp_earned = user_daily_log.xp_earned + excluded.xp_earned;
$$;
