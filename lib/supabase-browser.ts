"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/lib/supabase-env";

// Cliente de Supabase para usar EN EL NAVEGADOR (formulario de login).
// Usa la clave pública (anon / publishable) — a diferencia de la clave
// de servicio, esta sí está pensada para exponerse en código de cliente.
export function crearClienteSupabaseNavegador() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
