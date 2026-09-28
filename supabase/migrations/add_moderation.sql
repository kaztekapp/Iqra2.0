-- Moderation for community content (App Store guideline 1.2, Google Play UGC policy):
-- anyone can report a message, thread, reply or person, and block a person so
-- their content is hidden from them. Reports are reviewed by the team from the
-- dashboard; a reporter can see only their own reports.
--
-- Idempotent: safe to run more than once.

-- ── Reports ───────────────────────────────────────────────────────
create table if not exists public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  content_type text not null
    check (content_type in ('group_message', 'discussion_thread', 'discussion_reply', 'user')),
  content_id text not null,
  reported_user_id uuid references auth.users(id) on delete set null,
  reason text not null
    check (reason in ('spam', 'harassment', 'hate', 'sexual', 'other')),
  details text check (details is null or char_length(details) <= 1000),
  -- A copy of what was reported, so it can still be reviewed after its
  -- author edits or deletes it.
  content_snapshot text check (content_snapshot is null or char_length(content_snapshot) <= 4000),
  status text not null default 'open'
    check (status in ('open', 'reviewing', 'actioned', 'dismissed')),
  created_at timestamptz not null default now()
);

-- Set by the notify-report Edge Function when the team has been emailed, so
-- the same report never alerts twice.
alter table public.content_reports add column if not exists alerted_at timestamptz;

create index if not exists content_reports_status_created_idx
  on public.content_reports (status, created_at desc);
create index if not exists content_reports_reported_user_idx
  on public.content_reports (reported_user_id);

alter table public.content_reports enable row level security;

drop policy if exists "content_reports_insert_own" on public.content_reports;
create policy "content_reports_insert_own" on public.content_reports
  for insert to authenticated
  with check (reporter_id = auth.uid() and status = 'open');

drop policy if exists "content_reports_select_own" on public.content_reports;
create policy "content_reports_select_own" on public.content_reports
  for select to authenticated
  using (reporter_id = auth.uid());

-- ── Blocks ────────────────────────────────────────────────────────
create table if not exists public.blocked_users (
  blocker_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);

create index if not exists blocked_users_blocked_idx on public.blocked_users (blocked_id);

alter table public.blocked_users enable row level security;

drop policy if exists "blocked_users_select_own" on public.blocked_users;
create policy "blocked_users_select_own" on public.blocked_users
  for select to authenticated
  using (blocker_id = auth.uid());

drop policy if exists "blocked_users_insert_own" on public.blocked_users;
create policy "blocked_users_insert_own" on public.blocked_users
  for insert to authenticated
  with check (blocker_id = auth.uid());

drop policy if exists "blocked_users_update_own" on public.blocked_users;
create policy "blocked_users_update_own" on public.blocked_users
  for update to authenticated
  using (blocker_id = auth.uid())
  with check (blocker_id = auth.uid());

drop policy if exists "blocked_users_delete_own" on public.blocked_users;
create policy "blocked_users_delete_own" on public.blocked_users
  for delete to authenticated
  using (blocker_id = auth.uid());
