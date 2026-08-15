"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Producto } from "@/lib/productos";
import { opcionesEsfera, opcionesCilindro, opcionesEje } from "@/lib/formula";
import { useCart } from "@/context/CartContext";

function Select({
  label,
  value,
  onChange,
  opciones,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  opciones: string[];
}) {
  return (
    <select
      title={label}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-0 border-b border-light bg-transparent pb-0.5 text-center text-sm text-primary outline-none"
    >
      <option value="" disabled>
        Elegir
      </option>
      {opciones.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  );
}

function Cantidad({ valor, onChange }: { valor: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-1 select-none text-sm font-semibold text-primary">Cantidad</span>
      <div className="flex w-24 items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, valor - 1))}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-light text-light"
        >
          −
        </button>
        <span className="text-xl font-semibold text-primary">{valor}</span>
        <button
          type="button"
          onClick={() => onChange(valor + 1)}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-light text-light"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function ProductoDetalle({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregarItem } = useCart();

  const [mismaFormula, setMismaFormula] = useState(true);

  const [powerOd, setPowerOd] = useState("");
  const [cylOd, setCylOd] = useState("");
  const [axisOd, setAxisOd] = useState("");
  const [cantidadOd, setCantidadOd] = useState(1);

  const [powerOi, setPowerOi] = useState("");
  const [cylOi, setCylOi] = useState("");
  const [axisOi, setAxisOi] = useState("");
  const [cantidadOi, setCantidadOi] = useState(1);

  function agregarAlCarrito(e: React.FormEvent) {
    e.preventDefault();

    agregarItem({
      id: producto.id,
      selectPowerOd: powerOd,
      selectCylOd: cylOd,
      selectAxisOd: axisOd,
      cantidadOd: String(cantidadOd),
      // Si es "misma fórmula", el ojo izquierdo replica al derecho
      selectPowerOi: mismaFormula ? powerOd : powerOi,
      selectCylOi: mismaFormula ? cylOd : cylOi,
      selectAxisOi: mismaFormula ? axisOd : axisOi,
      cantidadOi: mismaFormula ? String(cantidadOd) : String(cantidadOi),
    });

    router.push("/cart");
  }

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="pt-12">
        <Link href={`/productos/lentesdecontacto`} className="text-sm uppercase text-light">
          {producto.laboratorio}
        </Link>
        <h1 className="mt-1 text-2xl font-extrabold text-primary md:text-3xl">
          {producto.titulo}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-8 gap-y-1 text-sm text-primary/60">
          <span>Uso por lente: {producto.uso}</span>
          <span>{producto.contenido}</span>
        </div>
      </div>

      <form onSubmit={agregarAlCarrito} className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Imagen */}
        <div className="flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={producto.imagen} alt={producto.alt} className="max-h-[28rem] w-full object-contain" />
        </div>

        {/* Formulario de fórmula */}
        <div>
          <div className="rounded-lg border border-primary p-6 shadow-header">
            <div className="text-center">
              <p className="text-lg font-medium text-primary">
                Ingresa tu fórmula de lentes de contacto
              </p>
            </div>

            <div className="mt-5 flex gap-4">
              <button
                type="button"
                onClick={() => setMismaFormula(true)}
                className={`w-1/2 rounded border px-2 py-2 text-xs font-semibold ${
                  mismaFormula ? "border-light text-light" : "border-light/40 text-light/40"
                }`}
              >
                ¿Misma fórmula en los dos ojos?
              </button>
              <button
                type="button"
                onClick={() => setMismaFormula(false)}
                className={`w-1/2 rounded border px-2 py-2 text-xs font-semibold ${
                  !mismaFormula ? "border-light text-light" : "border-light/40 text-light/40"
                }`}
              >
                ¿Diferente fórmula para cada ojo?
              </button>
            </div>

            <p className="mt-4 text-center text-sm font-bold text-primary">
              {mismaFormula ? "Misma Fórmula" : "Ojo Derecho"}
            </p>

            <div
              className={`mt-2 grid gap-4 rounded border border-light/40 p-4 ${
                mismaFormula ? "grid-cols-1" : "grid-cols-3"
              }`}
            >
              <div>
                <label className="mb-1 block text-center text-xs font-semibold text-primary">
                  Esfera (sph)
                </label>
                <Select label="Esfera OD" value={powerOd} onChange={setPowerOd} opciones={opcionesEsfera} />
              </div>
              {!mismaFormula && (
                <>
                  <div>
                    <label className="mb-1 block text-center text-xs font-semibold text-primary">
                      Cilindro (cyl)
                    </label>
                    <Select label="Cilindro OD" value={cylOd} onChange={setCylOd} opciones={opcionesCilindro} />
                  </div>
                  <div>
                    <label className="mb-1 block text-center text-xs font-semibold text-primary">Eje</label>
                    <Select label="Eje OD" value={axisOd} onChange={setAxisOd} opciones={opcionesEje} />
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <Cantidad valor={cantidadOd} onChange={setCantidadOd} />
            </div>

            {!mismaFormula && (
              <>
                <div className="my-5 h-px bg-light/40" />
                <p className="text-center text-sm font-bold text-primary">Ojo Izquierdo</p>
                <div className="mt-2 grid grid-cols-3 gap-4 rounded border border-light/40 p-4">
                  <div>
                    <label className="mb-1 block text-center text-xs font-semibold text-primary">
                      Esfera (sph)
                    </label>
                    <Select label="Esfera OI" value={powerOi} onChange={setPowerOi} opciones={opcionesEsfera} />
                  </div>
                  <div>
                    <label className="mb-1 block text-center text-xs font-semibold text-primary">
                      Cilindro (cyl)
                    </label>
                    <Select label="Cilindro OI" value={cylOi} onChange={setCylOi} opciones={opcionesCilindro} />
                  </div>
                  <div>
                    <label className="mb-1 block text-center text-xs font-semibold text-primary">Eje</label>
                    <Select label="Eje OI" value={axisOi} onChange={setAxisOi} opciones={opcionesEje} />
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Cantidad valor={cantidadOi} onChange={setCantidadOi} />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-2xl font-extrabold text-light">
              ${producto.precio.toLocaleString("es-CO")} <span className="text-sm font-normal text-primary">c/u</span>
            </span>
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </form>

      {/* Ficha técnica */}
      <div className="my-10 flex flex-wrap justify-center gap-6 rounded-xl border border-line p-6">
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Tiempo de uso</h4>
          <span>{producto.reemplazo}</span>
        </div>
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Contenido</h4>
          <span>{producto.contenido}</span>
        </div>
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Afección Visual</h4>
          <span>{producto.afeccion}</span>
        </div>
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Marca</h4>
          <span>Acuvue</span>
        </div>
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Contenido en agua</h4>
          <span>{producto.contenidoAgua}</span>
        </div>
        <div className="flex w-32 flex-col items-center text-center text-sm text-primary">
          <h4 className="font-bold">Material</h4>
          <span>{producto.material}</span>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-16 space-y-1 text-primary">
        {producto.descripcion.map((linea, i) => (
          <p key={i}>- {linea}</p>
        ))}
      </div>
    </div>
  );
}
