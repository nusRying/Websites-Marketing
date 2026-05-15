-- Phase 14: Production validation support
-- Durable worker job state and customer-success event capture.

CREATE TABLE IF NOT EXISTS pipeline_jobs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  message TEXT,
  request JSONB DEFAULT '{}'::jsonb,
  error TEXT,
  output_file TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE pipeline_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own pipeline jobs" ON pipeline_jobs;
CREATE POLICY "Users can view their own pipeline jobs"
ON pipeline_jobs FOR SELECT
USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create their own pipeline jobs" ON pipeline_jobs;
CREATE POLICY "Users can create their own pipeline jobs"
ON pipeline_jobs FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_pipeline_jobs_user_created
ON pipeline_jobs(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_pipeline_jobs_user_status
ON pipeline_jobs(user_id, status);

CREATE INDEX IF NOT EXISTS idx_pipeline_jobs_active
ON pipeline_jobs(user_id, updated_at DESC)
WHERE status IN ('PENDING', 'RUNNING', 'ENRICHING');

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_pipeline_jobs_updated_at ON pipeline_jobs;
CREATE TRIGGER trg_pipeline_jobs_updated_at
BEFORE UPDATE ON pipeline_jobs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS customer_success_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE customer_success_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own customer success events" ON customer_success_events;
CREATE POLICY "Users can view their own customer success events"
ON customer_success_events FOR SELECT
USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create their own customer success events" ON customer_success_events;
CREATE POLICY "Users can create their own customer success events"
ON customer_success_events FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE INDEX IF NOT EXISTS idx_customer_success_events_user_created
ON customer_success_events(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_customer_success_events_user_type
ON customer_success_events(user_id, event_type);

CREATE INDEX IF NOT EXISTS idx_customer_success_events_metadata_gin
ON customer_success_events USING GIN (metadata);
