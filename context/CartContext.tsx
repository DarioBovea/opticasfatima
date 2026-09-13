"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Fórmula (RX) de un ojo — solo la llevan los productos con fórmula
// (categoria "lentesdecontacto" por ahora).
export type FormulaOjo = {
  power: string;
  cyl: string;
  axis: string;
  add: string;
  cantidad: string;
};

// Un ítem del carrito es UNA de estas dos formas, nunca las dos:
// - "formula": producto con fórmula (lentes de contacto) — lleva RX por ojo
// - "simple": producto sin fórmula (gafas de sol, monturas, gotas,
//   soluciones) — solo cantidad
export type ItemCarrito =
  | { id: string; tipo: "formula"; od: FormulaOjo; oi: FormulaOjo }
  | { id: string; tipo: "simple"; cantidad: string };

type CartContextType = {
  items: ItemCarrito[];
  agregarItem: (item: ItemCarrito) => void;
  eliminarItem: (id: string) => void;
  vaciarCarrito: () => void;
  cantidadTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CLAVE_LOCALSTORAGE = "carrito";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [cargado, setCargado] = useState(false);

  // Al montar, cargamos lo que ya hubiera en localStorage (igual que el original)
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // localStorage no disponible o dato corrupto: seguimos con carrito vacío
    }
    setCargado(true);
  }, []);

  // Cada cambio se refleja en localStorage
  useEffect(() => {
    if (!cargado) return;
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(items));
  }, [items, cargado]);

  function agregarItem(item: ItemCarrito) {
    setItems((prev) => [...prev, item]);
  }

  function eliminarItem(id: string) {
    setItems((prev) => {
      const index = prev.findIndex((i) => i.id === id);
      if (index === -1) return prev;
      const copia = [...prev];
      copia.splice(index, 1);
      return copia;
    });
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const cantidadTotal = items.reduce((acc, i) => {
    if (i.tipo === "formula") {
      return acc + (parseInt(i.od.cantidad) || 0) + (parseInt(i.oi.cantidad) || 0);
    }
    return acc + (parseInt(i.cantidad) || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, agregarItem, eliminarItem, vaciarCarrito, cantidadTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
