-- Security audit, 2026-11-07. Community is hidden and holds no groups yet,
-- so none of this was reachable from the app; it is reachable with the
-- public key, which every copy of the app carries.
--
-- 1. Group roles. Joining checked only that the row was the caller's own, so
--    anyone could join any group as 'admin', or make themselves admin later
--    (UPDATE also checked only ownership). Now: a joiner is a 'member'
--    unless they created the group; only a group's admins change roles or
--    remove other members; nobody moves a membership to another group or user.
--    The member count also only moved when the group's creator joined (the
--    trigger ran as the joiner, whom RLS bars from updating the group).
-- 2. The chat-images and voice-notes buckets were public: any file could be
--    opened by link without signing in. They are private now; the read
--    policies for signed-in users stay. Community's relaunch must switch
--    getPublicUrl to signed URLs (communitySocialService).
-- 3. The removed credits system: check_and_deduct_credit (SECURITY DEFINER,
--    any user id, no search_path) and its two tables, every row empty. Sign-up
--    still created a credits row, so handle_new_user is rewritten first or
--    every sign-up would fail.

begin;

-- 1. Group roles -------------------------------------------------------------

-- Is the caller an admin of this group (its creator, or a member made admin)?
-- SECURITY DEFINER so the policies below can ask without recursing into
-- study_group_members' own policies.
create or replace function public.is_group_admin(p_group uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from study_groups g where g.id = p_group and g.creator_id = auth.uid())
      or exists (select 1 from study_group_members m
                 where m.group_id = p_group and m.user_id = auth.uid() and m.role = 'admin');
$$;
revoke execute on function public.is_group_admin(uuid) from public, anon;
grant execute on function public.is_group_admin(uuid) to authenticated;

drop policy if exists "Auth users can join" on public.study_group_members;
create policy "Auth users can join" on public.study_group_members
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and (
      role = 'member'
      or (role = 'admin' and exists (select 1 from study_groups g where g.id = group_id and g.creator_id = auth.uid()))
    )
  );

-- Members still update their own row (muted); admins update anyone's in
-- their group. The trigger below decides which columns may change.
drop policy if exists "Members can update own membership" on public.study_group_members;
create policy "Members can update own membership" on public.study_group_members
  for update to authenticated
  using (auth.uid() = user_id or public.is_group_admin(group_id))
  with check (auth.uid() = user_id or public.is_group_admin(group_id));

drop policy if exists "Users can leave" on public.study_group_members;
create policy "Users can leave" on public.study_group_members
  for delete to authenticated
  using (auth.uid() = user_id or public.is_group_admin(group_id));

create or replace function public.study_group_members_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() = 'service_role' then
    return new;
  end if;
  if new.group_id is distinct from old.group_id
     or new.user_id is distinct from old.user_id
     or new.joined_at is distinct from old.joined_at then
    raise exception 'a membership cannot be moved';
  end if;
  if new.role is distinct from old.role and not public.is_group_admin(old.group_id) then
    raise exception 'only a group admin can change a role';
  end if;
  if new.muted is distinct from old.muted and auth.uid() is distinct from old.user_id then
    raise exception 'only the member can mute their group';
  end if;
  return new;
end $$;

drop trigger if exists study_group_members_guard on public.study_group_members;
create trigger study_group_members_guard
  before update on public.study_group_members
  for each row execute function public.study_group_members_guard();

-- The count follows every join and leave, not only the creator's.
create or replace function public.update_group_member_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update study_groups set member_count = member_count + 1 where id = new.group_id;
  elsif tg_op = 'DELETE' then
    update study_groups set member_count = greatest(member_count - 1, 0) where id = old.group_id;
  end if;
  return null;
end $$;
revoke execute on function public.update_group_member_count() from public, anon, authenticated;

-- 2. Community buckets -------------------------------------------------------

update storage.buckets set public = false where id in ('chat-images', 'voice-notes');

-- 3. Credits -----------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  insert into public.user_arabic_progress (user_id) values (new.id);
  insert into public.user_quran_progress (user_id) values (new.id);
  insert into public.user_duas_progress (user_id) values (new.id);
  insert into public.user_prayer_progress (user_id) values (new.id);
  insert into public.user_stories_progress (user_id) values (new.id);
  insert into public.user_quiz_stats (user_id) values (new.id);
  insert into public.user_community_stats (user_id) values (new.id);
  return new;
end $$;

drop function if exists public.check_and_deduct_credit(uuid);
drop table if exists public.credit_transactions;
drop table if exists public.user_credits;

commit;
