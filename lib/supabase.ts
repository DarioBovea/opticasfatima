import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-env";

// Cliente de Supabase para uso EN EL SERVIDOR (API routes) únicamente.
// Usa la Service Role Key (ahora también llamada "secret key" en
// Supabase), que tiene permisos de escritura completos — nunca la
// expongas en código de cliente (componentes "use client").
//
// Variables de entorno necesarias (acepta el nombre viejo o el nuevo):
//   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY=tu-clave-de-servicio   (nombre viejo)
//   SUPABASE_SECRET_KEY=tu-clave-de-servicio         (nombre nuevo)
export function crearClienteSupabase() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!SUPABASE_URL || !key) {
    throw new Error(
      "Faltan las variables de entorno de Supabase. Revisa el README para configurarlas."
    );
  }

  return createClient(SUPABASE_URL, key);
}
