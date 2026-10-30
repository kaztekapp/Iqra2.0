-- The tts Edge Function (official Azure Speech voices) keeps every clip it
-- makes in a private bucket, shared by all users, and counts each account's
-- fresh synthesis against a daily budget. Only the function (service role)
-- touches either; clients have no policies on them at all.

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('tts-cache', 'tts-cache', false, 5242880, array['audio/mpeg'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.tts_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  chars integer not null check (chars > 0),
  created_at timestamptz not null default now()
);
create index if not exists tts_usage_user_time on public.tts_usage (user_id, created_at);
alter table public.tts_usage enable row level security;
revoke all on public.tts_usage from anon, authenticated;

commit;
