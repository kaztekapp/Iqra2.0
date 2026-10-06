-- Progress sync: one row per person holding their learning progress (letters,
-- vocabulary, lessons, Quran, stories, duas, quizzes, XP and streaks) as the
-- app saves it, so it can be restored on another phone. Written and read only
-- by its owner; deleted with the account.
--
-- Idempotent: safe to run more than once.

create table if not exists public.user_progress_sync (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_progress_sync enable row level security;

drop policy if exists "progress_sync_select_own" on public.user_progress_sync;
create policy "progress_sync_select_own" on public.user_progress_sync
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "progress_sync_insert_own" on public.user_progress_sync;
create policy "progress_sync_insert_own" on public.user_progress_sync
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "progress_sync_update_own" on public.user_progress_sync;
create policy "progress_sync_update_own" on public.user_progress_sync
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "progress_sync_delete_own" on public.user_progress_sync;
create policy "progress_sync_delete_own" on public.user_progress_sync
  for delete to authenticated
  using (user_id = auth.uid());
