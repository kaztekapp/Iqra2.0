-- Privacy lockdown (security audit 2026-11-17).
--
-- Found live with an ordinary signed-in account: every user's full learning
-- progress, quiz stats, community stats, achievements and daily study log
-- were readable by any other account. The app needs only leaderboard
-- numbers and today's totals from other people, so:
--
--   1. Personal learning tables: each account reads its own rows only.
--   2. The leaderboard view keeps showing everyone, but only its public
--      columns, and only to signed-in accounts (it runs as its owner).
--   3. Today's community totals come from a function that returns counts,
--      never rows.
--   4. Uploads to the community buckets stay closed, as 20261029 meant: its
--      drop of the voice-notes upload policy used a name with a line break
--      in it, so it most likely missed. Policies are found by what they
--      cover, not by name.
--
-- Writes are not touched. Safe to run twice.

begin;

-- 1. Own rows only -----------------------------------------------------------
do $$
declare
  t text;
  p record;
begin
  foreach t in array array[
    'user_arabic_progress', 'user_quiz_stats', 'user_community_stats',
    'user_daily_log', 'user_achievements'
  ] loop
    if to_regclass('public.' || t) is null then continue; end if;
    for p in
      select policyname from pg_policies
      where schemaname = 'public' and tablename = t and cmd = 'SELECT'
    loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
    execute format(
      'create policy "Own rows: read" on public.%I for select to authenticated using (user_id = (select auth.uid()))',
      t
    );
  end loop;
end $$;

-- An ALL policy can also grant reads; refuse to finish if one still lets an
-- account see rows that are not its own.
do $$
declare
  bad text;
begin
  select string_agg(tablename || ': ' || policyname, ', ') into bad
  from pg_policies
  where schemaname = 'public'
    and tablename in ('user_arabic_progress', 'user_quiz_stats', 'user_community_stats',
                      'user_daily_log', 'user_achievements')
    and cmd in ('SELECT', 'ALL')
    and permissive = 'PERMISSIVE'
    and coalesce(qual, '') !~* 'auth\.uid\(\)';
  if bad is not null then
    raise exception 'still readable by other accounts: %', bad;
  end if;
end $$;

-- 2. Leaderboard: public columns, signed-in only -------------------------------
alter view public.leaderboard set (security_invoker = false);
revoke all on public.leaderboard from public, anon;
grant select on public.leaderboard to authenticated;

-- 3. Today's totals, without anyone's rows -------------------------------------
create or replace function public.community_today_stats()
returns table (active_learners bigint, xp_today bigint, active_streaks bigint)
language sql
stable
security definer
set search_path = public
as $$
  select
    (select count(distinct user_id) from public.user_daily_log where study_date = current_date),
    (select coalesce(sum(xp_earned), 0)::bigint from public.user_daily_log where study_date = current_date),
    (select count(*) from public.user_arabic_progress where current_streak > 0);
$$;
revoke all on function public.community_today_stats() from public, anon;
grant execute on function public.community_today_stats() to authenticated;

-- 4. Community uploads closed --------------------------------------------------
do $$
declare
  p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('INSERT', 'UPDATE')
      and (coalesce(with_check, '') ~* '(voice-notes|chat-images)'
           or coalesce(qual, '') ~* '(voice-notes|chat-images)')
  loop
    raise notice 'dropping storage policy %', p.policyname;
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

commit;

-- Afterwards, as an ordinary signed-in account:
--   select count(distinct user_id) from user_arabic_progress;  -- 1 (yourself)
--   select count(*) from leaderboard;                          -- everyone
--   select * from community_today_stats();                     -- three numbers
-- And as anon: select count(*) from leaderboard;               -- permission denied
