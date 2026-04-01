-- Phase 07: Database Performance Optimization - Indexing Strategy

-- 1. Dashboard Filtering Optimization
-- Speeds up queries that filter by batch, user, and pipeline status simultaneously
CREATE INDEX IF NOT EXISTS idx_leads_user_batch_status 
ON leads(user_id, batch_id, status);

-- Speeds up quality-based filtering
CREATE INDEX IF NOT EXISTS idx_leads_user_quality 
ON leads(user_id, quality);

-- 2. JSONB Deep Search Optimization
-- Allows for lightning-fast searches within the AI-generated copy fields
CREATE INDEX IF NOT EXISTS idx_leads_ai_copy_gin 
ON leads USING GIN (ai_copy);

-- 3. Engagement History Performance
-- Speeds up the rendering of the 'Engagement History' timeline in the sidebar
CREATE INDEX IF NOT EXISTS idx_crm_history_lead_timestamp 
ON crm_history(lead_id, timestamp DESC);

-- 4. Global Business Search (Full-Text)
-- Enables high-performance text search across business names and categories
-- We use a generated column for better search performance
ALTER TABLE leads ADD COLUMN IF NOT EXISTS search_vector tsvector;

CREATE INDEX IF NOT EXISTS idx_leads_search_vector 
ON leads USING GIN (search_vector);

-- Function to update the search vector
CREATE OR REPLACE FUNCTION leads_search_trigger() RETURNS trigger AS $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.address, '')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;

-- Trigger to keep search vector in sync
DROP TRIGGER IF EXISTS trg_leads_search_update ON leads;
CREATE TRIGGER trg_leads_search_update BEFORE INSERT OR UPDATE
ON leads FOR EACH ROW EXECUTE FUNCTION leads_search_trigger();

-- Initial sync for existing data
UPDATE leads SET name = name WHERE search_vector IS NULL;
