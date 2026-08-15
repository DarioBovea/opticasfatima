import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { crearClienteSupabaseServidor } from "@/lib/supabase-server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabaseAuth = crearClienteSupabaseServidor();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { confirmado } = await request.json();
    const supabase = crearClienteSupabase();

    const { error } = await supabase
      .from("bonos")
      .update({ confirmado })
      .eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo actualizar el bono." },
      { status: 500 }
    );
  }
}
