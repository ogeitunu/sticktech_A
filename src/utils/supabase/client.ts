import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    (import.meta as any).env?.VITE_SUPABASE_URL ||
    'https://sfglqcallsmrdccnbkoa.supabase.co';

  const supabaseAnonKey = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
    '';

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
