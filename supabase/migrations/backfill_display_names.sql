-- Backfill display_name from auth.users metadata for users who have full_name set
-- This updates users whose display_name is currently just their email prefix
UPDATE public.user_profiles p
SET display_name = COALESCE(
  u.raw_user_meta_data->>'full_name',
  u.raw_user_meta_data->>'name',
  p.display_name
)
FROM auth.users u
WHERE p.user_id = u.id
  AND (
    u.raw_user_meta_data->>'full_name' IS NOT NULL
    OR u.raw_user_meta_data->>'name' IS NOT NULL
  );
