"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { crearClienteSupabaseNavegador } from "@/lib/supabase-browser";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    const supabase = crearClienteSupabaseNavegador();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Correo o contraseña incorrectos.");
      setCargando(false);
      return;
    }

    const volver = searchParams.get("volver") || "/admin";
    router.push(volver);
    router.refresh();
  }

  return (
    <div className="mt-36 flex justify-center px-6 pb-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-primary p-6 text-primary"
      >
        <h1 className="mb-6 text-xl font-bold">Iniciar sesión</h1>

        <label className="mb-4 flex flex-col gap-1 text-sm">
          Correo electrónico
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
          />
        </label>

        <label className="mb-4 flex flex-col gap-1 text-sm">
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-0 border-b border-light bg-transparent px-1 py-2 outline-none"
          />
        </label>

        {error && <p className="mb-3 text-sm text-[#961818]">{error}</p>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light disabled:opacity-60"
        >
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
