"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Producto } from "@/lib/productos";
import { opcionesEsfera, opcionesCilindro, opcionesEje, opcionesAdicion } from "@/lib/formula";
import { useCart } from "@/context/CartContext";
import GaleriaImagenes from "@/components/GaleriaImagenes";

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
      className="w-full border-0 border-b border-light bg-transparent pb-0.5 text-center text-sm text-primary outline-none dark:text-darktext [color-scheme:light] dark:[color-scheme:dark]"
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
      <span className="mb-1 select-none text-sm font-semibold text-primary dark:text-darktext">Cantidad</span>
      <div className="flex w-24 items-center justify-between">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, valor - 1))}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-light text-light"
        >
          −
        </button>
        <span className="text-xl font-semibold text-primary dark:text-darktext">{valor}</span>
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

type CamposFormula = {
  power: string;
  setPower: (v: string) => void;
  cyl: string;
  setCyl: (v: string) => void;
  axis: string;
  setAxis: (v: string) => void;
  add: string;
  setAdd: (v: string) => void;
};

// Los campos que se muestran dependen del tipo de lente:
// - esférico (miopía/hipermetropía): solo Esfera
// - tórico (astigmatismo): Esfera + Cilindro + Eje
// - multifocal (presbicia): Esfera + Adición
function CamposOjo({
  tipoFormula,
  prefijo,
  campos,
}: {
  tipoFormula: Producto["tipoFormula"];
  prefijo: "OD" | "OI";
  campos: CamposFormula;
}) {
  const columnas =
    tipoFormula === "esferico" ? "grid-cols-1" : tipoFormula === "multifocal" ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`mt-2 grid gap-4 rounded border border-light/40 p-4 max-[430px]:!grid-cols-1 ${columnas}`}>
      <div>
        <label className="mb-1 block text-center text-xs font-semibold text-primary dark:text-darktext">Esfera (sph)</label>
        <Select
          label={`Esfera ${prefijo}`}
          value={campos.power}
          onChange={campos.setPower}
          opciones={opcionesEsfera}
        />
      </div>

      {tipoFormula === "torico" && (
        <>
          <div>
            <label className="mb-1 block text-center text-xs font-semibold text-primary dark:text-darktext">Cilindro (cyl)</label>
            <Select
              label={`Cilindro ${prefijo}`}
              value={campos.cyl}
              onChange={campos.setCyl}
              opciones={opcionesCilindro}
            />
          </div>
          <div>
            <label className="mb-1 block text-center text-xs font-semibold text-primary dark:text-darktext">Eje</label>
            <Select label={`Eje ${prefijo}`} value={campos.axis} onChange={campos.setAxis} opciones={opcionesEje} />
          </div>
        </>
      )}

      {tipoFormula === "multifocal" && (
        <div>
          <label className="mb-1 block text-center text-xs font-semibold text-primary dark:text-darktext">Adición (ADD)</label>
          <Select
            label={`Adición ${prefijo}`}
            value={campos.add}
            onChange={campos.setAdd}
            opciones={opcionesAdicion}
          />
        </div>
      )}
    </div>
  );
}

// ---------- Formulario CON fórmula (lentes de contacto) ----------
function FormularioConFormula({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregarItem } = useCart();

  const [mismaFormula, setMismaFormula] = useState(true);

  const [powerOd, setPowerOd] = useState("");
  const [cylOd, setCylOd] = useState("");
  const [axisOd, setAxisOd] = useState("");
  const [addOd, setAddOd] = useState("");
  const [cantidadOd, setCantidadOd] = useState(1);

  const [powerOi, setPowerOi] = useState("");
  const [cylOi, setCylOi] = useState("");
  const [axisOi, setAxisOi] = useState("");
  const [addOi, setAddOi] = useState("");
  const [cantidadOi, setCantidadOi] = useState(1);

  function agregarAlCarrito(e: React.FormEvent) {
    e.preventDefault();

    agregarItem({
      id: producto.id,
      tipo: "formula",
      od: { power: powerOd, cyl: cylOd, axis: axisOd, add: addOd, cantidad: String(cantidadOd) },
      // Si es "misma fórmula", el ojo izquierdo replica al derecho
      oi: mismaFormula
        ? { power: powerOd, cyl: cylOd, axis: axisOd, add: addOd, cantidad: String(cantidadOd) }
        : { power: powerOi, cyl: cylOi, axis: axisOi, add: addOi, cantidad: String(cantidadOi) },
    });

    router.push("/cart");
  }

  return (
    <form onSubmit={agregarAlCarrito} className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
      {/* Imagen */}
      <div className="flex items-center justify-center">
        <GaleriaImagenes imagenes={[producto.imagen, ...(producto.galeria ?? [])]} alt={producto.alt} />
      </div>

      {/* Formulario de fórmula */}
      <div data-aos="fade-left">
        <div className="rounded-lg border border-primary p-8 shadow-header max-[1024px]:p-4 max-[768px]:p-8 dark:border-light/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="text-center">
            <p className="text-lg font-medium text-primary dark:text-darktext">
              Ingresa tu fórmula de lentes de contacto
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-light">
              {producto.tipoFormula === "esferico" && "Lente esférico — solo esfera (sph)"}
              {producto.tipoFormula === "torico" && "Lente tórico — esfera, cilindro y eje"}
              {producto.tipoFormula === "multifocal" && "Lente multifocal — esfera y adición"}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap md:flex-nowrap gap-4">
            <button
              type="button"
              onClick={() => setMismaFormula(true)}
              className={`w-1/2 rounded border px-2 py-2 text-xs font-semibold max-[430px]:w-full ${
                mismaFormula ? "border-light text-light" : "border-light/40 text-light/40"
              }`}
            >
              ¿Misma fórmula en los dos ojos?
            </button>
            <button
              type="button"
              onClick={() => setMismaFormula(false)}
              className={`w-1/2 rounded border px-2 py-2 text-xs font-semibold max-[430px]:w-full ${
                !mismaFormula ? "border-light text-light" : "border-light/40 text-light/40"
              }`}
            >
              ¿Diferente fórmula para cada ojo?
            </button>
          </div>

          <p className="mt-4 text-center text-sm font-bold text-primary dark:text-darktext">
            {mismaFormula ? "Misma Fórmula" : "Ojo Derecho"}
          </p>

          <CamposOjo
            tipoFormula={producto.tipoFormula}
            prefijo="OD"
            campos={{
              power: powerOd,
              setPower: setPowerOd,
              cyl: cylOd,
              setCyl: setCylOd,
              axis: axisOd,
              setAxis: setAxisOd,
              add: addOd,
              setAdd: setAddOd,
            }}
          />

          <div className="mt-4 flex justify-center">
            <Cantidad valor={cantidadOd} onChange={setCantidadOd} />
          </div>

          {!mismaFormula && (
            <>
              <div className="my-5 h-px bg-light/40" />
              <p className="text-center text-sm font-bold text-primary dark:text-darktext">Ojo Izquierdo</p>

              <CamposOjo
                tipoFormula={producto.tipoFormula}
                prefijo="OI"
                campos={{
                  power: powerOi,
                  setPower: setPowerOi,
                  cyl: cylOi,
                  setCyl: setCylOi,
                  axis: axisOi,
                  setAxis: setAxisOi,
                  add: addOi,
                  setAdd: setAddOi,
                }}
              />

              <div className="mt-4 flex justify-center">
                <Cantidad valor={cantidadOi} onChange={setCantidadOi} />
              </div>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col lg:flex-row items-center justify-around">
          <span className="text-2xl font-extrabold text-light">
            ${producto.precio.toLocaleString("es-CO")} <span className="text-sm font-normal text-primary dark:text-darktext">c/u</span>
          </span>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-primary px-6 py-3 font-bold uppercase text-white shadow-btn transition hover:bg-light"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </form>
  );
}

// ---------- Formulario SIN fórmula (gafas de sol, monturas, gotas, soluciones) ----------
function FormularioSimple({ producto }: { producto: Producto }) {
  const router = useRouter();
  const { agregarItem } = useCart();
  const [cantidad, setCantidad] = useState(1);

  function agregarAlCarrito(e: React.FormEvent) {
    e.preventDefault();
    agregarItem({ id: producto.id, tipo: "simple", cantidad: String(cantidad) });
    router.push("/cart");
  }

  return (
    <form onSubmit={agregarAlCarrito} className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <GaleriaImagenes imagenes={[producto.imagen, ...(producto.galeria ?? [])]} alt={producto.alt} />
      </div>

      <div data-aos="fade-left" className="flex flex-col justify-center">
        <div className="rounded-lg border border-primary p-8 shadow-header dark:border-light/40 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex justify-center">
            <Cantidad valor={cantidad} onChange={setCantidad} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-aroundn">
          <span className="text-2xl font-extrabold text-light">
            ${producto.precio.toLocaleString("es-CO")} <span className="text-sm font-normal text-primary dark:text-darktext">c/u</span>
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
  );
}

export default function ProductoDetalle({ producto }: { producto: Producto }) {
  const tieneFormula = Boolean(producto.tipoFormula);

  return (
    <div className="mx-auto max-w-5xl px-6 dark:text-darktext">
      <div className="pt-12">
        <Link href={`/productos/${producto.categoria}`} className="text-sm uppercase text-light">
          {producto.laboratorio}
        </Link>
        <h1 className="mt-1 text-2xl font-extrabold text-primary dark:text-darktext md:text-3xl">
          {producto.titulo}
        </h1>
        {tieneFormula && (
          <div className="mt-2 flex flex-wrap gap-x-8 gap-y-1 text-sm text-primary/60 dark:text-darktext/60">
            <span>Uso por lente: {producto.uso}</span>
            <span>{producto.contenido}</span>
          </div>
        )}
      </div>

      {tieneFormula ? (
        <FormularioConFormula producto={producto} />
      ) : (
        <FormularioSimple producto={producto} />
      )}

      {/* Ficha técnica — específica de lentes de contacto, o genérica
          (producto.atributos) para las demás categorías */}
      {tieneFormula ? (
        <div className="my-10 flex flex-wrap justify-center gap-6 rounded-xl border border-line p-6 max-[550px]:gap-4 max-[550px]:p-4 dark:border-darkline">
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Tiempo de uso</h4>
            <span>{producto.reemplazo}</span>
          </div>
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Contenido</h4>
            <span>{producto.contenido}</span>
          </div>
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Afección Visual</h4>
            <span>{producto.afeccion}</span>
          </div>
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Marca</h4>
            <span>{producto.laboratorio}</span>
          </div>
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Contenido en agua</h4>
            <span>{producto.contenidoAgua}</span>
          </div>
          <div className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]">
            <h4 className="font-bold">Material</h4>
            <span>{producto.material}</span>
          </div>
        </div>
      ) : (
        producto.atributos &&
        producto.atributos.length > 0 && (
          <div className="my-10 flex flex-wrap justify-center gap-6 rounded-xl border border-line p-6 max-[550px]:gap-4 max-[550px]:p-4 dark:border-darkline">
            {producto.atributos.map((a) => (
              <div
                key={a.etiqueta}
                className="flex w-32 flex-col items-center text-center text-sm text-primary dark:text-darktext max-[320px]:w-[calc(50%-1rem)]"
              >
                <h4 className="font-bold">{a.etiqueta}</h4>
                <span>{a.valor}</span>
              </div>
            ))}
          </div>
        )
      )}

      {/* Descripción */}
      <div className="mb-16 space-y-1 text-primary dark:text-darktext">
        {producto.descripcion.map((linea, i) => (
          <p key={i}>- {linea}</p>
        ))}
      </div>
    </div>
  );
}
