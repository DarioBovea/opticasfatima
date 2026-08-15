"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Un ítem del carrito = un producto + su fórmula (RX) por ojo.
// Misma estructura que guardaba el js/carrito.js original en localStorage.
export type ItemCarrito = {
  id: string;
  selectPowerOd: string;
  selectCylOd: string;
  selectAxisOd: string;
  cantidadOd: string;
  selectPowerOi: string;
  selectCylOi: string;
  selectAxisOi: string;
  cantidadOi: string;
};

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

  const cantidadTotal = items.reduce(
    (acc, i) => acc + (parseInt(i.cantidadOd) || 0) + (parseInt(i.cantidadOi) || 0),
    0
  );

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
