"use client";

import { useRef, useState } from "react";
import Script from "next/script";

const NUMERO_WHATSAPP = "573043446574";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        opts: { sitekey: string; callback: (token: string) => void; "error-callback"?: () => void }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function FormularioBono() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sitioWeb, setSitioWeb] = useState(""); // campo trampa (honeypot)
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [codigo, setCodigo] = useState<string | null>(null);
  const [tokenCaptcha, setTokenCaptcha] = useState("");
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>();

  function onTurnstileLoad() {
    if (!TURNSTILE_SITE_KEY || !captchaRef.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(captchaRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => setTokenCaptcha(token),
      "error-callback": () => setTokenCaptcha(""),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Campo trampa: un visitante real nunca ve ni llena este campo (está
    // oculto con CSS), así que si viene lleno, es casi seguro un bot.
    // Respondemos como si todo saliera bien, sin gastar un código real
    // ni tocar la base de datos, para no delatarle al bot que lo detectamos.
    if (sitioWeb) {
      setCodigo("XXXXXXXX");
      return;
    }

    if (TURNSTILE_SITE_KEY && !tokenCaptcha) {
      setError("Por favor completa la verificación de seguridad.");
      return;
    }

    setCargando(true);
    try {
      const res = await fetch("/api/bono", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          direccion,
          fechaNacimiento,
          tokenCaptcha,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Algo salió mal.");
      }

      setCodigo(data.codigo);

      const mensaje = [
        "Hola, quiero confirmar mi registro para el Bono Regalo.",
        `Código: ${data.codigo}`,
        `Nombre: ${nombre}`,
        `Correo: ${email}`,
        `Teléfono: ${telefono}`,
      ].join("\n");
      const url = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
      // Si falló, reseteamos el captcha para que pueda volver a intentar
      // (un token de Turnstile solo se puede usar una vez).
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      setTokenCaptcha("");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="w-[70%] max-[768px]:w-[90%] max-[320px]:w-full">
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
          onLoad={onTurnstileLoad}
        />
      )}

      <fieldset className="border-0">
        <legend className="leading-relaxed text-primary dark:text-darktext">
          Regístrate y te enviaremos <strong>GRATIS un BONO de $50.000</strong>{" "}
          que podrás utilizar en la compra de cualquiera de nuestros
          productos.
        </legend>

        {codigo ? (
          <div className="mt-4 space-y-2 rounded-lg border border-light bg-light/10 p-4 text-primary dark:text-darktext">
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
                placeholder="Nombre completo*"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary dark:border-darkline dark:bg-darkcard dark:text-darktext max-[768px]:w-4/5 max-[320px]:w-full"
              />
            </label>
            <label className="m-3">
              <input
                type="email"
                placeholder="Correo electrónico*"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary dark:border-darkline dark:bg-darkcard dark:text-darktext max-[768px]:w-4/5 max-[320px]:w-full"
              />
            </label>
            <label className="m-3">
              <input
                type="tel"
                placeholder="Teléfono / WhatsApp*"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary dark:border-darkline dark:bg-darkcard dark:text-darktext max-[768px]:w-4/5 max-[320px]:w-full"
              />
            </label>
            <label className="m-3">
              <input
                type="text"
                placeholder="Dirección*"
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary dark:border-darkline dark:bg-darkcard dark:text-darktext max-[768px]:w-4/5 max-[320px]:w-full"
              />
            </label>
            <label className="m-3 flex flex-col gap-1 text-sm text-primary dark:text-darktext">
              Fecha de nacimiento*
              <input
                type="date"
                required
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-1/2 border border-line px-2 py-2 text-primary outline-none focus:border-primary dark:border-darkline dark:bg-darkcard dark:text-darktext max-[768px]:w-4/5 max-[320px]:w-full"
              />
            </label>

            {/* Campo trampa: invisible para personas, visible para bots que
                llenan todos los inputs de un formulario sin mirar el CSS. */}
            <label
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              aria-hidden="true"
              tabIndex={-1}
            >
              No llenar este campo
              <input
                type="text"
                name="sitio_web"
                autoComplete="off"
                tabIndex={-1}
                value={sitioWeb}
                onChange={(e) => setSitioWeb(e.target.value)}
              />
            </label>

            {TURNSTILE_SITE_KEY && <div ref={captchaRef} className="m-3" />}

            {error && <p className="mx-3 text-sm text-[#961818]">{error}</p>}

            <button
              type="submit"
              disabled={cargando}
              className="m-3 w-1/2 rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light disabled:opacity-60 max-[768px]:w-4/5 max-[320px]:w-full"
            >
              {cargando ? "Generando código..." : "Registrarme y canjear 50Mil"}
            </button>
            <div className="m-3 flex items-start gap-2">
              <input type="checkbox" required id="terminos" className="mt-1" />
              <label htmlFor="terminos" className="text-sm text-primary dark:text-darktext">
                He leído y acepto los{" "}
                <a href="/terminos-y-condiciones" target="_blank" className="underline">
                  Términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="/politica-de-privacidad" target="_blank" className="underline">
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
