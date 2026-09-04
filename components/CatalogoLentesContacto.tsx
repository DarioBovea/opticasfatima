"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Producto } from "@/lib/productos";

type Props = { productos: Producto[] };

export default function CatalogoLentesContacto({ productos }: Props) {
  const marcas = useMemo(
    () => Array.from(new Set(productos.map((p) => p.laboratorio))).sort(),
    [productos]
  );
  const afecciones = useMemo(
    () => Array.from(new Set(productos.map((p) => p.afeccion))).sort(),
    [productos]
  );
  const reemplazos = useMemo(
    () => Array.from(new Set(productos.map((p) => p.reemplazo))).sort(),
    [productos]
  );

  const [marcaSel, setMarcaSel] = useState<string[]>([]);
  const [afeccionSel, setAfeccionSel] = useState<string[]>([]);
  const [reemplazoSel, setReemplazoSel] = useState<string[]>([]);

  function toggle(valor: string, lista: string[], setLista: (v: string[]) => void) {
    setLista(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);
  }

  const filtrados = productos.filter((p) => {
    if (marcaSel.length && !marcaSel.includes(p.laboratorio)) return false;
    if (afeccionSel.length && !afeccionSel.includes(p.afeccion)) return false;
    if (reemplazoSel.length && !reemplazoSel.includes(p.reemplazo)) return false;
    return true;
  });

  const hayFiltros = marcaSel.length + afeccionSel.length + reemplazoSel.length > 0;

  function limpiarFiltros() {
    setMarcaSel([]);
    setAfeccionSel([]);
    setReemplazoSel([]);
  }

  function GrupoFiltro({
    titulo,
    opciones,
    seleccion,
    setSeleccion,
  }: {
    titulo: string;
    opciones: string[];
    seleccion: string[];
    setSeleccion: (v: string[]) => void;
  }) {
    return (
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{titulo}</h3>
        <div className="flex flex-col gap-2">
          {opciones.map((op) => (
            <label key={op} className="flex items-center gap-2 text-sm text-primary">
              <input
                type="checkbox"
                checked={seleccion.includes(op)}
                onChange={() => toggle(op, seleccion, setSeleccion)}
                className="h-4 w-4 accent-primary"
              />
              {op}
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      {/* Filtros */}
      <aside className="w-full shrink-0 md:w-56">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-primary">Filtrar por</h2>
          {hayFiltros && (
            <button onClick={limpiarFiltros} className="text-sm text-light underline">
              Limpiar
            </button>
          )}
        </div>

        {marcas.length > 1 && (
          <GrupoFiltro titulo="Marca" opciones={marcas} seleccion={marcaSel} setSeleccion={setMarcaSel} />
        )}
        <GrupoFiltro
          titulo="Defecto visual"
          opciones={afecciones}
          seleccion={afeccionSel}
          setSeleccion={setAfeccionSel}
        />
        <GrupoFiltro
          titulo="Reemplazo"
          opciones={reemplazos}
          seleccion={reemplazoSel}
          setSeleccion={setReemplazoSel}
        />
      </aside>

      {/* Resultados */}
      <div className="flex-1">
        <p className="mb-4 text-sm text-primary/60">
          {filtrados.length} producto{filtrados.length !== 1 && "s"}
        </p>

        {filtrados.length === 0 ? (
          <p className="text-primary">No hay productos con esos filtros.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {filtrados.map((p, i) => {
              const etiquetaTipo =
                p.tipoFormula === "esferico"
                  ? "Esférico"
                  : p.tipoFormula === "torico"
                  ? "Tórico"
                  : "Multifocal";

              return (
                <Link
                  key={p.id}
                  href={`/productos/lentesdecontacto/${p.slug}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[calc(50%-12px)] lg:w-[calc(33.3%-16px)]"
                  data-aos="fade-up"
                  data-aos-delay={(i % 3) * 100}
                >
                  {/* Imagen con fondo propio y etiqueta de tipo de lente */}
                  <div className="relative flex items-center justify-center bg-canvas py-8">
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      {etiquetaTipo}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.imagen}
                      alt={p.alt}
                      className="max-w-[200px] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                    />
                  </div>

                  {/* Contenido con jerarquía clara: marca → título → precio → detalles */}
                  <div className="flex flex-1 flex-col px-6 py-5 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/50">
                      {p.laboratorio}
                    </p>
                    <p className="mt-1 text-base font-bold leading-snug text-primary">{p.titulo}</p>

                    <p className="mt-3 text-2xl font-extrabold text-light">
                      ${p.precio.toLocaleString("es-CO")}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-4">
                      <span className="rounded-full bg-light/15 px-3 py-1 text-xs font-semibold text-primary">
                        {p.afeccion}
                      </span>
                      <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary/70">
                        {p.uso} · {p.reemplazo}
                      </span>
                    </div>

                    <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-bold text-primary transition group-hover:gap-2 group-hover:text-light">
                      Ver detalle
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
