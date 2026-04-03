import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (typeof window !== 'undefined') {
  console.log("Supabase Client: Initializing with Browser Client. URL:", supabaseUrl ? "FOUND" : "MISSING");
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
