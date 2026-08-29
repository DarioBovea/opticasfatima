import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { generarCodigo } from "@/lib/codigo";
import { verificarTurnstile } from "@/lib/turnstile";

const HORAS_ENTRE_INTENTOS = 24;

export async function POST(request: Request) {
  try {
    const { nombre, email, tokenCaptcha, sitio_web } = await request.json();

    // Defensa en profundidad: si alguien llama a esta API directamente
    // (sin pasar por el formulario) y manda el campo trampa lleno,
    // lo rechazamos igual que en el cliente.
    if (sitio_web) {
      return NextResponse.json({ codigo: generarCodigo() });
    }

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y correo son obligatorios." },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for");
    const captchaValido = await verificarTurnstile(tokenCaptcha, ip);
    if (!captchaValido) {
      return NextResponse.json(
        { error: "No se pudo verificar que eres una persona. Intenta de nuevo." },
        { status: 400 }
      );
    }

    const supabase = crearClienteSupabase();

    // Límite por correo: si ya generó un bono en las últimas 24 horas,
    // no dejamos que pida otro (evita que alguien —o un script— genere
    // decenas de códigos con el mismo correo).
    const desde = new Date(Date.now() - HORAS_ENTRE_INTENTOS * 60 * 60 * 1000).toISOString();
    const { data: recientes, error: errorConsulta } = await supabase
      .from("bonos")
      .select("id")
      .eq("email", email)
      .gte("creado_en", desde)
      .limit(1);

    if (errorConsulta) throw errorConsulta;

    if (recientes && recientes.length > 0) {
      return NextResponse.json(
        {
          error:
            "Ya generaste un bono con este correo recientemente. Revisa tu WhatsApp o inténtalo de nuevo más tarde.",
        },
        { status: 429 }
      );
    }

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
