-- ============================================================
-- WEBHOOK IDEMPOTENCY TABLE
-- Tracks processed RevenueCat webhook event IDs to prevent
-- duplicate credit grants from retried deliveries.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  app_user_id TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup by event_id
CREATE INDEX IF NOT EXISTS idx_webhook_events_event_id ON public.webhook_events (event_id);

-- Auto-clean events older than 30 days (run manually or via cron)
-- SELECT delete_old_webhook_events();
CREATE OR REPLACE FUNCTION public.delete_old_webhook_events()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.webhook_events
  WHERE processed_at < NOW() - INTERVAL '30 days';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- No RLS needed — this table is only accessed by the service role key
-- from the edge function (not by authenticated users)
