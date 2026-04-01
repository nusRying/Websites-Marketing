-- Phase 13: Advanced Security & Compliance

-- 1. AUDIT LOGS (Immutable record of sensitive actions)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- DATA_EXPORT, LOGIN, SETTINGS_CHANGE
  target_id TEXT, -- batch_id or lead_id
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Protect audit logs from any modification or deletion
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own audit logs" ON audit_logs FOR SELECT USING (auth.uid() = user_id);
-- No policy for UPDATE or DELETE - making it effectively append-only for users

-- 2. ENHANCED RBAC ROLES (Preparation)
-- We add a 'role' column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'admin'; -- admin, member, viewer

-- 3. SECURITY HEADERS (CSP, etc.) handled via Next.js next.config.ts or Middleware
