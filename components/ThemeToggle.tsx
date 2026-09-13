"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const CLAVE = "opticas-tema";

export default function ThemeToggle() {
  const [oscuro, setOscuro] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    // El script inline en layout.tsx ya aplicó la clase antes de pintar;
    // acá solo sincronizamos el estado de React con lo que quedó puesto.
    setOscuro(document.documentElement.classList.contains("dark"));
    setListo(true);
  }, []);

  function alternar() {
    const nuevo = !oscuro;
    setOscuro(nuevo);
    document.documentElement.classList.toggle("dark", nuevo);
    localStorage.setItem(CLAVE, nuevo ? "dark" : "light");
  }

  // Evita mostrar el ícono incorrecto por una fracción de segundo
  // mientras se sincroniza con lo que ya decidió el script inline.
  if (!listo) return <div className="h-5 w-5" />;

  return (
    <button
      onClick={alternar}
      aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={oscuro ? "Modo claro" : "Modo oscuro"}
      className="text-primary transition hover:text-light dark:text-darktext"
    >
      {oscuro ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
