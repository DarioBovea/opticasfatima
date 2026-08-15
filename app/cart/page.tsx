"use client";

import { useCart } from "@/context/CartContext";
import { obtenerProductoPorId } from "@/lib/productos";

const NUMERO_WHATSAPP = "573206740505";

export default function CartPage() {
  const { items, eliminarItem, vaciarCarrito } = useCart();

  const filas = items
    .map((item) => {
      const producto = obtenerProductoPorId(item.id);
      if (!producto) return null;
      const unidades = (parseInt(item.cantidadOd) || 0) + (parseInt(item.cantidadOi) || 0);
      const subtotal = producto.precio * unidades;
      return { item, producto, unidades, subtotal };
    })
    .filter((f): f is NonNullable<typeof f> => f !== null);

  const total = filas.reduce((acc, f) => acc + f.subtotal, 0);

  function handleVaciar() {
    if (confirm(`Se van a borrar ${filas.reduce((a, f) => a + f.unidades, 0)} productos. ¿Estás seguro?`)) {
      vaciarCarrito();
    }
  }

  function handleComprar() {
    const lineas = filas.map(({ item, producto }) => {
      const rxOd = `${item.selectPowerOd || "-"} ${item.selectCylOd} ${item.selectAxisOd ? "X " + item.selectAxisOd : ""}`.trim();
      const rxOi = `${item.selectPowerOi || "-"} ${item.selectCylOi} ${item.selectAxisOi ? "X " + item.selectAxisOi : ""}`.trim();
      return (
        `• ${producto.titulo}\n` +
        `  OD: ${rxOd} (x${item.cantidadOd})\n` +
        `  OI: ${rxOi} (x${item.cantidadOi})`
      );
    });

    const mensaje = [
      "Hola, buenos días. Estoy interesado/a en adquirir estos productos:",
      "",
      ...lineas,
      "",
      `Total: $${total.toLocaleString("es-CO")}`,
    ].join("\n");

    const url = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="mt-36 min-h-[calc(100vh-344px)] px-6 pb-24 md:px-[calc((100%-1180px)/2)]">
      <h2 className="mb-8 text-2xl font-bold text-primary">Carrito De Compras</h2>

      {filas.length === 0 ? (
        <p className="text-primary">
          Tu carrito está vacío <span aria-hidden>🙁</span>
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {filas.map(({ item, producto, subtotal }) => (
              <div
                key={item.id}
                className="flex w-full flex-col gap-4 rounded-xl border border-primary p-4 text-primary sm:flex-row sm:items-center sm:pl-8"
              >
                <div className="w-full sm:w-1/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={producto.imagen} alt={producto.alt} className="rounded-lg" />
                </div>

                <div className="w-full border-t border-primary pt-3 sm:w-3/5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <small className="text-light">{producto.laboratorio}</small>
                  <h3 className="m-0 font-bold">{producto.titulo}</h3>

                  <div className="mt-2 text-sm">
                    <h5 className="mb-0 mt-2 font-semibold">Ojo Derecho</h5>
                    <p className="m-0">
                      RX: {item.selectPowerOd} {item.selectCylOd} {item.selectAxisOd && `X ${item.selectAxisOd}`}
                    </p>
                    <p className="m-0">Cantidad: {item.cantidadOd}</p>

                    <h5 className="mb-0 mt-2 font-semibold">Ojo Izquierdo</h5>
                    <p className="m-0">
                      RX: {item.selectPowerOi} {item.selectCylOi} {item.selectAxisOi && `X ${item.selectAxisOi}`}
                    </p>
                    <p className="m-0">Cantidad: {item.cantidadOi}</p>
                  </div>

                  <p className="mt-2">
                    <small className="text-lg font-semibold">Precio: </small>
                    <span className="text-lg font-semibold">${producto.precio.toLocaleString("es-CO")}</span>
                  </p>
                  <p>
                    <small className="text-lg font-semibold">Subtotal: </small>
                    <span className="text-lg font-semibold">${subtotal.toLocaleString("es-CO")}</span>
                  </p>
                </div>

                <div className="flex w-full justify-end sm:w-1/5">
                  <button
                    onClick={() => eliminarItem(item.id)}
                    title="Eliminar"
                    className="text-[#961818] transition hover:opacity-70"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <button
              onClick={handleVaciar}
              className="rounded-2xl bg-[#e2e2e2] px-6 py-4 font-semibold uppercase text-primary transition hover:bg-[#d5d5d5]"
            >
              Vaciar carrito
            </button>

            <div className="flex overflow-hidden rounded-2xl">
              <div className="flex items-center gap-3 bg-[#e2e2e2] px-6 font-semibold uppercase text-primary">
                <span>Total:</span>
                <span>${total.toLocaleString("es-CO")}</span>
              </div>
              <button
                onClick={handleComprar}
                className="bg-primary px-6 py-4 font-semibold uppercase text-white transition hover:bg-light"
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
