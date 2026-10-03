-- Let a person remove their own uploads, so "Delete Account" can keep the
-- privacy policy's promise that voice notes and chat images go with the
-- account. Storage stamps every object with its uploader (owner_id), and the
-- app's paths are <groupId>/<userId>/<time>.<ext>, so a person's files cannot
-- be found by prefix alone: the function below lists them by owner.
--
-- Idempotent: safe to run more than once.

-- ── Which files are mine ───────────────────────────────────────────
-- security definer because storage.objects is not readable through the API.
create or replace function public.list_own_storage_objects()
returns table (bucket_id text, name text)
language sql
stable
security definer
set search_path = public, storage
as $$
  select o.bucket_id, o.name
  from storage.objects o
  where o.bucket_id in ('chat-images', 'voice-notes')
    and o.owner_id = auth.uid()::text;
$$;

revoke all on function public.list_own_storage_objects() from public;
grant execute on function public.list_own_storage_objects() to authenticated;

-- ── Owners may delete their own files ─────────────────────────────
drop policy if exists "Owners can delete their chat images" on storage.objects;
create policy "Owners can delete their chat images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'chat-images' and owner_id = auth.uid()::text);

drop policy if exists "Owners can delete their voice notes" on storage.objects;
create policy "Owners can delete their voice notes" on storage.objects
  for delete to authenticated
  using (bucket_id = 'voice-notes' and owner_id = auth.uid()::text);
