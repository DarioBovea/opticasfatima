"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  ShoppingCart,
  Search,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buscar } from "@/lib/busqueda";

const menu = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contactenos", label: "Contáctenos" },
];

const redes = [
  { href: "https://wa.me/573206740505", label: "WhatsApp", Icon: MessageCircle },
  { href: "https://www.facebook.com/opticasfatima", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/opticasfatima/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/in/opticasfatima/", label: "LinkedIn", Icon: Linkedin },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [buscadorAbierto, setBuscadorAbierto] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [oculto, setOculto] = useState(false);
  const ultimoScroll = useRef(0);
  const { cantidadTotal } = useCart();

  const sugerencias = buscar(textoBusqueda, 5);

  // Cierra el buscador al cambiar de página
  useEffect(() => {
    setBuscadorAbierto(false);
    setTextoBusqueda("");
  }, [pathname]);

  function irAResultados(e: React.FormEvent) {
    e.preventDefault();
    if (!textoBusqueda.trim()) return;
    router.push(`/buscar?q=${encodeURIComponent(textoBusqueda.trim())}`);
  }

  // Replica el comportamiento original: el header se oculta al bajar
  // y reaparece al subir (js/main.js).
  useEffect(() => {
    function onScroll() {
      const actual = window.scrollY;
      setOculto(actual > ultimoScroll.current && actual > 100);
      ultimoScroll.current = actual;
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full bg-white/95 shadow-header transition-all duration-300 ${
        oculto ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Barra superior */}
      <div className="h-[34px] bg-primary">
        <div className="mx-auto flex h-full w-4/5 items-center justify-end gap-6 text-white">
          <div className="flex items-center gap-3">
            {redes.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Nuestro ${label}`}
                className="transition hover:text-light"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <a
            href="mailto:info@opticasfatima.com"
            className="hidden font-bold tracking-wide transition hover:text-light sm:inline"
          >
            info@opticasfatima.com
          </a>
          <Link href="/cart" title="Carrito de compras" className="relative transition hover:text-light">
            <ShoppingCart size={18} />
            {cantidadTotal > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-light text-[10px] font-bold text-primary">
                {cantidadTotal}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Navegación */}
      <nav className="mx-auto flex h-[6.875em] w-4/5 items-center justify-between">
        <Link href="/" title="Ópticas Fátima">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logotipos/azul-letras.png" alt="Ópticas Fátima" className="h-20" />
        </Link>

        <ul className="hidden items-center md:flex">
          {menu.map((item) => {
            const activo = pathname === item.href;
            return (
              <li key={item.href} className="relative mx-5">
                <Link
                  href={item.href}
                  className={`relative text-lg font-semibold text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:content-[''] ${
                    activo ? "after:w-3/5" : "after:w-0 hover:after:w-3/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => setBuscadorAbierto((v) => !v)}
              aria-label="Buscar"
              className="text-primary transition hover:text-light"
            >
              <Search size={20} />
            </button>
          </li>
        </ul>

        {/* Hamburguesa animada */}
        <button
          className="flex h-[30px] w-[30px] flex-col justify-center gap-1.5 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto((v) => !v)}
        >
          <span
            className={`block h-0.5 w-full origin-bottom-left bg-primary transition-all duration-300 ${
              menuAbierto ? "translate-y-px rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-primary transition-all duration-300 ${
              menuAbierto ? "-ml-8 opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full origin-bottom-left bg-primary transition-all duration-300 ${
              menuAbierto ? "translate-y-0.5 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Buscador desplegable — fondo celeste */}
      {buscadorAbierto && (
        <div className="bg-light/80 py-4">
          <div className="mx-auto w-3/5">
            <form onSubmit={irAResultados} className="flex gap-2">
              <input
                type="text"
                placeholder="¿Qué deseas buscar?"
                autoFocus
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
                className="flex-1 border border-primary bg-transparent px-2 py-1.5 text-primary placeholder:text-primary focus:outline-none"
              />
              <button type="submit" className="text-primary hover:text-light" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            {/* Resultados en vivo mientras escribe */}
            {textoBusqueda.trim() && (
              <div className="mt-2 max-h-80 overflow-y-auto rounded-lg bg-white shadow-header">
                {sugerencias.length === 0 ? (
                  <p className="p-4 text-sm text-primary/60">Sin resultados.</p>
                ) : (
                  <ul>
                    {sugerencias.map((r) => (
                      <li key={r.href} className="border-b border-line last:border-0">
                        <Link
                          href={r.href}
                          className="block px-4 py-3 transition hover:bg-light/10"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wide text-light">
                            {r.tipo}
                          </span>
                          <p className="font-semibold text-primary">{r.titulo}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/buscar?q=${encodeURIComponent(textoBusqueda.trim())}`}
                  className="block border-t border-line px-4 py-3 text-center text-sm font-semibold text-light hover:bg-light/10"
                >
                  Ver todos los resultados →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menú móvil */}
      {menuAbierto && (
        <ul className="flex flex-col gap-1 border-t border-line bg-white px-6 py-4 md:hidden">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuAbierto(false)}
                className="block py-2 font-semibold text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
