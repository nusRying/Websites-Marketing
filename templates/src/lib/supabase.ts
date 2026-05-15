import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder';



if (typeof window !== 'undefined') {
  console.log("Supabase Client: Initializing with Browser Client. URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "USING PLACEHOLDER");
}

const isPlaceholder = supabaseUrl.includes('placeholder-project') || supabaseUrl.includes('wmwcuhrorrmvjzojjbyo');

// Define a minimal mock client to prevent the SDK from initializing and failing network calls
const mockSupabase = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        order: async () => ({ data: [], error: null }),
        limit: async () => ({ data: [], error: null }),
      }),
      order: async () => ({ data: [], error: null }),
    }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    upsert: async () => ({ data: null, error: null }),
  }),
} as any;

// Ensure the client is always created without crashing the build worker
export const supabase = isPlaceholder 
  ? mockSupabase 
  : createBrowserClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      }
    });
