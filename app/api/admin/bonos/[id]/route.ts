import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { crearClienteSupabaseServidor } from "@/lib/supabase-server";
import type { EstadoBono } from "@/lib/tipos-bono";

const ESTADOS_VALIDOS: EstadoBono[] = ["pendiente", "confirmado", "utilizado"];

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
    const { estado } = await request.json();

    if (!ESTADOS_VALIDOS.includes(estado)) {
      return NextResponse.json({ error: "Estado no válido." }, { status: 400 });
    }

    const ahora = new Date().toISOString();
    const actualizacion: Record<string, unknown> = { estado };

    if (estado === "pendiente") {
      actualizacion.confirmado_en = null;
      actualizacion.usado_en = null;
    } else if (estado === "confirmado") {
      actualizacion.confirmado_en = ahora;
      actualizacion.usado_en = null;
    } else if (estado === "utilizado") {
      actualizacion.usado_en = ahora;
    }

    const supabase = crearClienteSupabase();
    const { error } = await supabase.from("bonos").update(actualizacion).eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ ok: true, ...actualizacion });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo actualizar el bono." },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const supabase = crearClienteSupabase();
    const { error } = await supabase.from("bonos").delete().eq("id", params.id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo eliminar el registro." },
      { status: 500 }
    );
  }
}
