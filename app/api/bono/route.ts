import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { generarCodigo } from "@/lib/codigo";

export async function POST(request: Request) {
  try {
    const { nombre, email } = await request.json();

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son obligatorios." },
        { status: 400 }
      );
    }

    const supabase = crearClienteSupabase();

    // Generamos el código y reintentamos si por mala suerte ya existe
    // (la tabla tiene una restricción UNIQUE sobre "codigo").
    let codigo = "";
    let insertado = false;
    let intentos = 0;

    while (!insertado && intentos < 5) {
      codigo = generarCodigo();
      const { error } = await supabase.from("bonos").insert({
        nombre,
        email,
        codigo,
        confirmado: false,
      });

      if (!error) {
        insertado = true;
      } else if (error.code !== "23505") {
        // 23505 = violación de UNIQUE en Postgres → reintentamos con otro código.
        // Cualquier otro error, lo propagamos.
        throw error;
      }
      intentos++;
    }

    if (!insertado) {
      throw new Error("No se pudo generar un código único, intenta de nuevo.");
    }

    return NextResponse.json({ codigo });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "No se pudo procesar el registro. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
