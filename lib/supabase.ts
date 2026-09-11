import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-env";

export function crearClienteSupabase() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!SUPABASE_URL || !key) {
    throw new Error(
      "Faltan las variables de entorno de Supabase. Revisa el README para configurarlas."
    );
  }

  return createClient(SUPABASE_URL, key);
}
