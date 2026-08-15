"use client";

import { useState } from "react";

// ⚠️ No envía los datos a ningún lado todavía: falta conectarlo a una
// base de datos o a un servicio de formularios (ver README).
export default function FormularioRegistro() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="mt-6 rounded-lg border border-light bg-light/10 p-6 text-primary">
        ¡Gracias por registrarte! Muy pronto recibirás nuestras promociones.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-primary">
        Nombre completo*
        <input
          type="text"
          required
          className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-primary">
        Fecha de nacimiento*
        <input
          type="date"
          required
          className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-primary">
        Dirección*
        <input
          type="text"
          required
          className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-primary">
        Teléfono*
        <input
          type="tel"
          required
          className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
        />
      </label>
      <button
        type="submit"
        className="mt-2 self-start rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light"
      >
        Registrarme
      </button>
    </form>
  );
}
