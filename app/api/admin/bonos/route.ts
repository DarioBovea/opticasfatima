import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { crearClienteSupabaseServidor } from "@/lib/supabase-server";

export async function GET() {

  const supabaseAuth = crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {

    const supabase = crearClienteSupabase();
    const { data, error } = await supabase
      .from("bonos")
      .select(
        "id, codigo, estado, creado_en, confirmado_en, usado_en, personas(id, nombre, email, telefono, direccion, fecha_nacimiento)"
      )
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
