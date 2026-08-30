import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { VALOR_BONO_PESOS } from "@/lib/tipos-bono";

export async function POST(request: Request) {
  try {
    const { codigo } = await request.json();

    if (!codigo || typeof codigo !== "string") {
      return NextResponse.json({ error: "Ingresa un código." }, { status: 400 });
    }

    const supabase = crearClienteSupabase();
    const { data, error } = await supabase
      .from("bonos")
      .select("codigo, estado")
      .eq("codigo", codigo.trim().toUpperCase())
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: "Ese código no existe. Revisa que esté bien escrito." },
        { status: 404 }
      );
    }

    if (data.estado === "utilizado") {
      return NextResponse.json(
        { error: "Este bono ya fue utilizado." },
        { status: 409 }
      );
    }

    if (data.estado === "pendiente") {
      return NextResponse.json(
        {
          error:
            "Este bono todavía no ha sido confirmado. Escríbenos por WhatsApp para confirmarlo antes de usarlo.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ valido: true, codigo: data.codigo, descuento: VALOR_BONO_PESOS });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo verificar el código. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
