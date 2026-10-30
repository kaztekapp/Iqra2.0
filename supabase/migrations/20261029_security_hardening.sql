-- Security hardening before launch (review of 2026-10-29, checked against production).
--
-- The app talks to the database with the public anon key, so these policies and
-- grants are the only protection. What was open:
--   * Anyone holding the anon key, without an account, could read every user's
--     profile (display names default to the email's local part) and progress,
--     and all Community content.
--   * upsert_daily_xp and check_and_deduct_credit took any user id and were
--     callable by anon: anyone could change anyone's XP or drain their credits.
--   * group_messages: any user could post into any group, and could rewrite
--     group_id / notified_at on their own message to make notify-group-message
--     push their text to another group's members again and again.
--   * The chat-images and voice-notes buckets are public and any account could
--     upload anything, so they could be used to host files on our domain.
--
-- Community is hidden in the app (COMMUNITY_ENABLED = false) and only comes back
-- in a new reviewed binary, so its uploads are closed here; restore them, with
-- per-user folder checks, size and type limits, when it is released.
-- Idempotent: safe to run more than once.

begin;

-- 1. Nothing user-facing reads other people's data without an account: every
--    "readable by anyone" SELECT policy now needs a signed-in user.
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname from pg_policies
    where schemaname in ('public', 'storage') and cmd = 'SELECT'
      and qual is not null and (qual = 'true' or qual like '(bucket_id = %')
      and 'public' = any (roles)
  loop
    execute format('alter policy %I on %I.%I to authenticated', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- 2. Credits are gone with the AI features: no client may call these.
do $$
declare f record;
begin
  for f in
    select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('check_and_deduct_credit', 'grant_credits', 'refund_message_credit', 'delete_old_webhook_events')
  loop
    execute format('revoke execute on function %s from public, anon, authenticated', f.sig);
  end loop;
end $$;

-- 3. Daily XP: only ever your own row, only a sane positive amount.
create or replace function public.upsert_daily_xp(p_user_id uuid, p_study_date date, p_xp_amount integer)
returns void
language sql
security definer
set search_path = public
as $$
  insert into user_daily_log (user_id, study_date, xp_earned)
  select p_user_id, p_study_date, p_xp_amount
  where p_user_id = auth.uid() and p_xp_amount > 0 and p_xp_amount <= 5000
  on conflict (user_id, study_date)
  do update set xp_earned = user_daily_log.xp_earned + excluded.xp_earned;
$$;
revoke execute on function public.upsert_daily_xp(uuid, date, integer) from public, anon;
grant execute on function public.upsert_daily_xp(uuid, date, integer) to authenticated;

-- 4. Definer functions get a fixed search_path; account deletion is for signed-in users.
alter function public.handle_new_user() set search_path = public;
alter function public.delete_own_account() set search_path = public;
revoke execute on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;

-- 5. Group messages: members only, and an author can edit the text, not where
--    or when the message was posted.
alter policy "Anyone can read group messages" on public.group_messages
  using (exists (select 1 from public.study_group_members m
                 where m.group_id = group_messages.group_id and m.user_id = auth.uid()));
alter policy "Auth users can send messages" on public.group_messages
  with check (auth.uid() = user_id
              and exists (select 1 from public.study_group_members m
                          where m.group_id = group_messages.group_id and m.user_id = auth.uid()));
alter policy "Authors can update own messages" on public.group_messages
  with check (auth.uid() = user_id);

create or replace function public.group_messages_freeze_columns()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  -- The push function (service role) stamps notified_at; clients may not.
  if auth.role() = 'service_role' then
    return new;
  end if;
  if new.group_id is distinct from old.group_id
     or new.user_id is distinct from old.user_id
     or new.created_at is distinct from old.created_at
     or new.notified_at is distinct from old.notified_at
     or new.type is distinct from old.type
     or new.is_pinned is distinct from old.is_pinned
     or new.author_name is distinct from old.author_name then
    raise exception 'only the message text can be edited';
  end if;
  return new;
end $$;
drop trigger if exists group_messages_freeze_columns on public.group_messages;
create trigger group_messages_freeze_columns
  before update on public.group_messages
  for each row execute function public.group_messages_freeze_columns();

-- 6. A report cannot pre-mark itself as already alerted (which skipped the email).
alter policy content_reports_insert_own on public.content_reports
  with check (reporter_id = auth.uid() and status = 'open' and alerted_at is null);

-- 7. Storage: no uploads while Community is hidden, and limits for when it returns.
drop policy if exists "Auth users can upload chat images" on storage.objects;
drop policy if exists "Authenticated users can upload voice
  notes" on storage.objects;
update storage.buckets set file_size_limit = 10485760, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic']
  where id = 'chat-images';
update storage.buckets set file_size_limit = 10485760, allowed_mime_types = array['audio/mp4', 'audio/m4a', 'audio/x-m4a', 'audio/aac', 'audio/mpeg']
  where id = 'voice-notes';

commit;
