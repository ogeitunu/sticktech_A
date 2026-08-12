import { createServerClient, type CookieOptions } from '@supabase/ssr';

export function createClient(cookieStore?: any) {
  const supabaseUrl = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    'https://sfglqcallsmrdccnbkoa.supabase.co';

  const supabaseAnonKey = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    '';

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore?.get?.(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore?.set?.({ name, value, ...options });
          } catch (error) {
            // Handled for Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore?.set?.({ name, value: '', ...options });
          } catch (error) {
            // Handled for Server Components
          }
        },
      },
    }
  );
}
