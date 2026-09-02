"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { crearClienteSupabaseNavegador } from "@/lib/supabase-browser";
import type { EstadoBono } from "@/lib/tipos-bono";

type Persona = {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  direccion: string | null;
  fecha_nacimiento: string | null;
};

type Bono = {
  id: string;
  codigo: string;
  estado: EstadoBono;
  creado_en: string;
  confirmado_en: string | null;
  usado_en: string | null;
  personas: Persona | null;
};

const ESTILOS_ESTADO: Record<EstadoBono, string> = {
  pendiente: "bg-[#f0e0b0] text-[#7a5b00]",
  confirmado: "bg-light/20 text-primary",
  utilizado: "bg-primary text-white",
};

const ETIQUETA_ESTADO: Record<EstadoBono, string> = {
  pendiente: "Pendiente",
  confirmado: "Confirmado",
  utilizado: "Utilizado",
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

  async function cambiarEstado(bono: Bono, nuevoEstado: EstadoBono) {
    try {
      const res = await fetch(`/api/admin/bonos/${bono.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar.");
      setBonos((prev) =>
        prev.map((b) => (b.id === bono.id ? { ...b, estado: nuevoEstado } : b))
      );
    } catch {
      setError("No se pudo actualizar ese bono, intenta de nuevo.");
    }
  }

  async function eliminarBono(bono: Bono) {
    const nombre = bono.personas?.nombre ?? "este registro";
    if (
      !confirm(
        `¿Eliminar el bono de "${nombre}" (${bono.codigo})? Esto no se puede deshacer.`
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/bonos/${bono.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo eliminar.");
      setBonos((prev) => prev.filter((b) => b.id !== bono.id));
    } catch {
      setError("No se pudo eliminar ese registro, intenta de nuevo.");
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
      b.personas?.nombre.toLowerCase().includes(q) ||
      b.personas?.email.toLowerCase().includes(q) ||
      b.codigo.toLowerCase().includes(q)
    );
  });

  const pendientes = bonos.filter((b) => b.estado === "pendiente").length;
  const usados = bonos.filter((b) => b.estado === "utilizado").length;

  return (
    <div className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] px-6 pb-24">
      <div className="mx-auto max-w-5xl">
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
            {pendientes} pendiente{pendientes !== 1 && "s"} · {usados} utilizado
            {usados !== 1 && "s"} · {bonos.length} total
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
                  <th className="py-2 pr-4">Contacto</th>
                  <th className="py-2 pr-4">Código</th>
                  <th className="py-2 pr-4">Estado</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((b) => (
                  <tr key={b.id} className="border-b border-line align-top">
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {new Date(b.creado_en).toLocaleDateString("es-CO")}
                    </td>
                    <td className="py-2 pr-4">
                      {b.personas?.nombre ?? (
                        <span className="italic text-primary/40">(sin datos)</span>
                      )}
                      {b.personas?.direccion && (
                        <p className="text-xs text-primary/50">{b.personas.direccion}</p>
                      )}
                      {b.personas?.fecha_nacimiento && (
                        <p className="text-xs text-primary/50">
                          Nace: {new Date(b.personas.fecha_nacimiento).toLocaleDateString("es-CO")}
                        </p>
                      )}
                    </td>
                    <td className="py-2 pr-4">
                      {b.personas?.email}
                      {b.personas?.telefono && (
                        <p className="text-xs text-primary/50">{b.personas.telefono}</p>
                      )}
                    </td>
                    <td className="py-2 pr-4 font-mono font-bold">{b.codigo}</td>
                    <td className="py-2 pr-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${ESTILOS_ESTADO[b.estado]}`}>
                        {ETIQUETA_ESTADO[b.estado]}
                      </span>
                      {b.estado === "utilizado" && b.usado_en && (
                        <p className="mt-1 text-xs text-primary/50">
                          {new Date(b.usado_en).toLocaleDateString("es-CO")}
                        </p>
                      )}
                    </td>
                    <td className="space-y-1 py-2 pr-4">
                      {b.estado === "pendiente" && (
                        <button
                          onClick={() => cambiarEstado(b, "confirmado")}
                          className="block text-sm text-primary underline"
                        >
                          Marcar confirmado
                        </button>
                      )}
                      {b.estado === "confirmado" && (
                        <>
                          <button
                            onClick={() => cambiarEstado(b, "utilizado")}
                            className="block text-sm text-primary underline"
                          >
                            Marcar como usado
                          </button>
                          <button
                            onClick={() => cambiarEstado(b, "pendiente")}
                            className="block text-sm text-primary underline"
                          >
                            Revertir a pendiente
                          </button>
                        </>
                      )}
                      {b.estado === "utilizado" && (
                        <button
                          onClick={() => cambiarEstado(b, "confirmado")}
                          className="block text-sm text-primary underline"
                        >
                          Revertir a confirmado
                        </button>
                      )}
                      <button
                        onClick={() => eliminarBono(b)}
                        className="block text-sm text-[#961818] underline"
                      >
                        Eliminar
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
