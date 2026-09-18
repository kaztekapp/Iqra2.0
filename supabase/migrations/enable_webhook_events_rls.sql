-- ============================================================
-- LOCK DOWN webhook_events (if it exists)
-- add_webhook_events.sql created the table without row level security on
-- the assumption that only the service role touches it. In Supabase every
-- table in the public schema is reachable through the anon and
-- authenticated roles unless RLS is on, so enable it with no policies: the
-- service role bypasses RLS and keeps working, everyone else gets nothing.
--
-- Checked 2026-09-18: the linked production project never had this table
-- (the credits system it served was removed before the migration was
-- applied), so this is guarded and does nothing there. It still protects
-- any environment where add_webhook_events.sql did run.
-- ============================================================

DO $$
BEGIN
  IF to_regclass('public.webhook_events') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY';
    EXECUTE 'REVOKE ALL ON public.webhook_events FROM anon, authenticated';
  END IF;
END $$;
