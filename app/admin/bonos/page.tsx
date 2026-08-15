"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { crearClienteSupabaseNavegador } from "@/lib/supabase-browser";

type Bono = {
  id: string;
  nombre: string;
  email: string;
  codigo: string;
  confirmado: boolean;
  creado_en: string;
};

export default function PanelBonosPage() {
  const router = useRouter();
  const [bonos, setBonos] = useState<Bono[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [correo, setCorreo] = useState<string | null>(null);

  useEffect(() => {
    cargarBonos();
    crearClienteSupabaseNavegador()
      .auth.getUser()
      .then(({ data }) => setCorreo(data.user?.email ?? null));
  }, []);

  async function cargarBonos() {
    setCargando(true);
    setError("");
    try {
      // La sesión viaja sola en las cookies — no hace falta mandar
      // ninguna clave a mano.
      const res = await fetch("/api/admin/bonos");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBonos(data.bonos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal.");
    } finally {
      setCargando(false);
    }
  }

  async function toggleConfirmado(bono: Bono) {
    try {
      const res = await fetch(`/api/admin/bonos/${bono.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmado: !bono.confirmado }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar.");
      setBonos((prev) =>
        prev.map((b) => (b.id === bono.id ? { ...b, confirmado: !b.confirmado } : b))
      );
    } catch {
      setError("No se pudo actualizar ese bono, intenta de nuevo.");
    }
  }

  async function handleSalir() {
    await crearClienteSupabaseNavegador().auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const filtrados = bonos.filter((b) => {
    const q = busqueda.toLowerCase();
    return (
      b.nombre.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.codigo.toLowerCase().includes(q)
    );
  });

  const pendientes = bonos.filter((b) => !b.confirmado).length;

  return (
    <div className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-primary">Panel de Bonos Regalo</h1>
            {correo && <p className="text-xs text-primary/50">Sesión: {correo}</p>}
          </div>
          <button onClick={handleSalir} className="text-sm text-primary underline">
            Cerrar sesión
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o código..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full max-w-xs border border-line px-3 py-2 text-primary outline-none focus:border-primary sm:w-auto"
          />
          <span className="text-sm text-primary">
            {pendientes} pendiente{pendientes !== 1 && "s"} de {bonos.length} total
          </span>
        </div>

        {error && <p className="mb-3 text-sm text-[#961818]">{error}</p>}

        {cargando ? (
          <p className="text-primary">Cargando...</p>
        ) : filtrados.length === 0 ? (
          <p className="text-primary">No hay registros todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-primary">
              <thead>
                <tr className="border-b border-primary">
                  <th className="py-2 pr-4">Fecha</th>
                  <th className="py-2 pr-4">Nombre</th>
                  <th className="py-2 pr-4">Correo</th>
                  <th className="py-2 pr-4">Código</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((b) => (
                  <tr key={b.id} className="border-b border-line">
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {new Date(b.creado_en).toLocaleDateString("es-CO")}
                    </td>
                    <td className="py-2 pr-4">{b.nombre}</td>
                    <td className="py-2 pr-4">{b.email}</td>
                    <td className="py-2 pr-4 font-mono font-bold">{b.codigo}</td>
                    <td className="py-2 pr-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          b.confirmado
                            ? "bg-light/20 text-primary"
                            : "bg-[#f0e0b0] text-[#7a5b00]"
                        }`}
                      >
                        {b.confirmado ? "Confirmado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => toggleConfirmado(b)}
                        className="text-sm text-primary underline"
                      >
                        {b.confirmado ? "Revertir" : "Marcar confirmado"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
