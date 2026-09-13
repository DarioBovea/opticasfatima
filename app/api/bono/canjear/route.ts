import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { codigo } = await request.json();

    if (!codigo || typeof codigo !== "string") {
      return NextResponse.json({ error: "Falta el código." }, { status: 400 });
    }

    const supabase = crearClienteSupabase();

    const { data, error } = await supabase
      .from("bonos")
      .update({ estado: "utilizado", usado_en: new Date().toISOString() })
      .eq("codigo", codigo.trim().toUpperCase())
      .eq("estado", "confirmado")
      .select("codigo");

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Este bono ya no está disponible (puede que ya se haya usado)." },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo canjear el bono. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
