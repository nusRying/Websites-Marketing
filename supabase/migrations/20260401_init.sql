-- SaaS Initial Schema

-- 1. PROFILES (Linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. BATCHES (Scraper Runs)
CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  niche TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT DEFAULT 'COMPLETED', -- IDLE, SCRAPING, ENRICHING, COMPLETED
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on batches
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own batches" ON batches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own batches" ON batches FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. LEADS (Enriched Data)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  rating TEXT,
  category TEXT,
  website TEXT,
  quality TEXT DEFAULT 'POTENTIAL',
  no_website BOOLEAN DEFAULT TRUE,
  screenshot_path TEXT,
  
  -- AI Content (Stored as JSON for flexibility)
  ai_copy JSONB DEFAULT '{}'::jsonb,
  
  -- Status / Pipeline Stage
  status TEXT DEFAULT 'NEW', -- NEW, PITCH READY, CONTACTED, NEGOTIATING, CLOSED, INTERESTED
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own leads" ON leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own leads" ON leads FOR ALL USING (auth.uid() = user_id);

-- 4. CRM HISTORY (Tracking Events)
CREATE TABLE crm_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- VIEW, ESCALATION, PITCH_SENT
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS on crm_history
ALTER TABLE crm_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view history of their leads" ON crm_history FOR SELECT 
USING (EXISTS (SELECT 1 FROM leads WHERE leads.id = crm_history.lead_id AND leads.user_id = auth.uid()));

CREATE POLICY "Users can log history for their own leads" ON crm_history FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM leads WHERE leads.id = crm_history.lead_id AND leads.user_id = auth.uid()));
