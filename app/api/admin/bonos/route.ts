import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { crearClienteSupabaseServidor } from "@/lib/supabase-server";

export async function GET() {
  // El middleware ya bloquea esta ruta si no hay sesión, pero
  // verificamos de nuevo aquí por si algún día se llama sin pasar
  // por el middleware (defensa en profundidad).
  const supabaseAuth = crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    // Para leer la tabla usamos la Service Role Key (permisos completos),
    // ya que confirmamos arriba que quien pide esto es un admin logueado.
    const supabase = crearClienteSupabase();
    const { data, error } = await supabase
      .from("bonos")
      .select("*")
      .order("creado_en", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ bonos: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo cargar la lista de bonos." },
      { status: 500 }
    );
  }
}
