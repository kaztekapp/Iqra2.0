-- ============================================================
-- LOCK DOWN webhook_events
-- The table was created without row level security on the
-- assumption that only the service role touches it. In Supabase
-- every table in the public schema is reachable through the
-- anon and authenticated roles unless RLS is on, so enable it
-- with no policies: the service role bypasses RLS and keeps
-- working, everyone else gets nothing.
-- ============================================================

ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.webhook_events FROM anon, authenticated;
