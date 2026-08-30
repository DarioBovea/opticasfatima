import { NextResponse } from "next/server";
import { crearClienteSupabase } from "@/lib/supabase";
import { generarCodigo } from "@/lib/codigo";
import { verificarTurnstile } from "@/lib/turnstile";

export async function POST(request: Request) {
  try {
    const { nombre, email, telefono, direccion, fechaNacimiento, tokenCaptcha, sitio_web } =
      await request.json();

    // Defensa en profundidad: si alguien llama a esta API directamente
    // (sin pasar por el formulario) y manda el campo trampa lleno,
    // lo rechazamos igual que en el cliente.
    if (sitio_web) {
      return NextResponse.json({ codigo: generarCodigo() });
    }

    if (!nombre || !email || !telefono || !direccion || !fechaNacimiento) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
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
    const emailNormalizado = String(email).trim().toLowerCase();

    // Un correo = una sola persona, para siempre.
    const { data: existente, error: errorConsulta } = await supabase
      .from("personas")
      .select("id")
      .eq("email", emailNormalizado)
      .maybeSingle();

    if (errorConsulta) throw errorConsulta;

    if (existente) {
      return NextResponse.json(
        { error: "Este correo ya ha sido registrado." },
        { status: 409 }
      );
    }

    // 1. Creamos la persona
    const { data: persona, error: errorPersona } = await supabase
      .from("personas")
      .insert({
        nombre,
        email: emailNormalizado,
        telefono,
        direccion,
        fecha_nacimiento: fechaNacimiento,
      })
      .select("id")
      .single();

    if (errorPersona) throw errorPersona;

    // 2. Creamos su bono, con reintento si el código genera choca con
    //    la restricción UNIQUE (muy poco probable, pero posible).
    let codigo = "";
    let insertado = false;
    let intentos = 0;

    while (!insertado && intentos < 5) {
      codigo = generarCodigo();
      const { error } = await supabase.from("bonos").insert({
        persona_id: persona.id,
        codigo,
        estado: "pendiente",
      });

      if (!error) {
        insertado = true;
      } else if (error.code !== "23505") {
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
