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
    const cambios = await request.json();
    // Solo dejamos que el admin cambie estos 2 campos, nunca el resto
    // de la fila (código, correo, etc.) a través de esta ruta.
    const actualizacion: Record<string, unknown> = {};
    if (typeof cambios.confirmado === "boolean") actualizacion.confirmado = cambios.confirmado;
    if (typeof cambios.usado === "boolean") {
      actualizacion.usado = cambios.usado;
      actualizacion.usado_en = cambios.usado ? new Date().toISOString() : null;
    }

    const supabase = crearClienteSupabase();

    const { error } = await supabase
      .from("bonos")
      .update(actualizacion)
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
