import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabase-env";

// Cliente de Supabase para Server Components y API routes, que lee la
// sesión desde las cookies de la petición (así sabe si el admin ya
// inició sesión). Usa la clave pública — la sesión del usuario logueado
// es la que determina los permisos, no una clave especial.
export function crearClienteSupabaseServidor() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // set() puede fallar si se llama desde un Server Component
            // puro; el middleware se encarga de refrescar la sesión.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // ver nota arriba
          }
        },
      },
    }
  );
}
