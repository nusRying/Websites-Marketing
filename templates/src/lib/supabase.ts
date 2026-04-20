import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';

if (typeof window !== 'undefined') {
  console.log("Supabase Client: Initializing with Browser Client. URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "USING PLACEHOLDER");
}

// Ensure the client is always created without crashing the build worker
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
