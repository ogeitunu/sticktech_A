import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function updateSession(request: any) {
  let response = {
    headers: new Map(),
  };

  const supabaseUrl = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
    'https://sfglqcallsmrdccnbkoa.supabase.co';

  const supabaseAnonKey = 
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
    '';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request?.cookies?.get?.(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request?.cookies?.set?.({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request?.cookies?.set?.({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  return { supabase, response };
}
