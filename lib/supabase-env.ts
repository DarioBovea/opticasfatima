// Supabase cambió el nombre de sus API keys hace poco: lo que antes se
// llamaba "anon key" ahora se llama "publishable key", y "service_role
// key" ahora es "secret key". Si conectaste Supabase con Vercel usando
// su integración automática, es probable que las variables se hayan
// creado con los nombres NUEVOS — por eso aquí aceptamos ambos, para
// que funcione sin importar cuál versión te haya creado la integración.
//
// Nota técnica: las 2 constantes de abajo son seguras de usar tanto en
// componentes de servidor como de cliente ("use client"), porque Next.js
// reemplaza cada "process.env.NEXT_PUBLIC_ALGO" de forma literal en el
// momento de compilar — con tal de que cada variable se escriba tal
// cual (no funciona si se arma el nombre dinámicamente).
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "";
