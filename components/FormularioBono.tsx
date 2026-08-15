"use client";

import { useState } from "react";

const NUMERO_WHATSAPP = "573043446574";

export default function FormularioBono() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [codigo, setCodigo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const res = await fetch("/api/bono", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Algo salió mal.");
      }

      setCodigo(data.codigo);

      // Abrimos WhatsApp con el mensaje ya armado para que el cliente
      // solo tenga que darle a "Enviar" y confirmar su registro.
      const mensaje = [
        "Hola, quiero confirmar mi registro para el Bono Regalo.",
        `Código: ${data.codigo}`,
        `Nombre: ${nombre}`,
        `Correo: ${email}`,
      ].join("\n");
      const url = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="w-full md:w-[70%]">
      <fieldset className="border-0">
        <legend className="leading-relaxed text-primary">
          Introduce tu correo electrónico y te enviaremos{" "}
          <strong>GRATIS un BONO de $50.000</strong> que podrás utilizar en la
          compra de cualquiera de nuestros productos.
        </legend>

        {codigo ? (
          <div className="mt-4 space-y-2 rounded-lg border border-light bg-light/10 p-4 text-primary">
            <p>
              ¡Listo! Tu código es <strong className="text-lg">{codigo}</strong>.
            </p>
            <p className="text-sm">
              Te abrimos WhatsApp con el mensaje ya armado — solo dale a
              enviar para confirmar tu registro y coordinar la entrega del
              bono. Guarda el código por si acaso.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="m-3">
              <input
                type="text"
                placeholder="Nombre y apellido*"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary"
              />
            </label>
            <label className="m-3">
              <input
                type="email"
                placeholder="Correo electrónico*"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary"
              />
            </label>

            {error && <p className="mx-3 text-sm text-[#961818]">{error}</p>}

            <button
              type="submit"
              disabled={cargando}
              className="m-3 w-1/2 rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light disabled:opacity-60"
            >
              {cargando ? "Generando código..." : "Canjea un cupón por 50Mil"}
            </button>
            <div className="m-3 flex items-start gap-2">
              <input type="checkbox" required id="terminos" className="mt-1" />
              <label htmlFor="terminos" className="text-sm text-primary">
                He leído y acepto los{" "}
                <a href="#" className="underline">
                  Términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="underline">
                  Política de Privacidad.
                </a>
              </label>
            </div>
          </form>
        )}
      </fieldset>
    </div>
  );
}
