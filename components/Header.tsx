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
import ThemeToggle from "@/components/ThemeToggle";

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

  // Con el menú móvil a pantalla completa, bloqueamos el scroll de
  // fondo mientras está abierto — si no, se puede desplazar la página
  // detrás del menú, que es confuso.
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-white/30 bg-white/70 shadow-[0_8px_32px_rgba(13,56,87,0.10)] backdrop-blur-lg backdrop-saturate-150 transition-all duration-300 dark:border-darkline/60 dark:bg-darksurface/80 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
        oculto ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Barra superior — se mantiene con el color sólido de marca para
          que los datos de contacto se lean con total nitidez; el efecto
          de vidrio vive en el header como conjunto (el borde y la
          sombra suave) y sobre todo en la navegación de abajo. */}
      <div className="h-[34px] bg-primary/95 backdrop-blur-sm min-[1920px]:h-[46px]">
        <div className="mx-auto flex h-full w-4/5 items-center justify-end gap-6 text-white max-[820px]:w-[90%] min-[1920px]:w-[70%]">
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
            className="font-bold tracking-wide transition hover:text-light max-[375px]:hidden"
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
      <nav className="mx-auto flex h-[6.875em] w-4/5 items-center justify-between max-[820px]:h-[86px] max-[820px]:w-[90%] min-[1920px]:h-[8.375em] min-[1920px]:w-[70%]">
        <Link href="/" title="Ópticas Fátima">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logotipos/azul-letras.png"
            alt="Ópticas Fátima"
            className="h-20 max-[820px]:h-[3.125rem] min-[1920px]:h-[6.875em] dark:brightness-0 dark:invert"
          />
        </Link>

        <ul className="flex items-center gap-0 max-[720px]:hidden">
          {menu.map((item) => {
            const activo = pathname === item.href;
            return (
              <li key={item.href} className="relative mx-5">
                <Link
                  href={item.href}
                  className={`relative text-lg font-semibold text-primary after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:content-[''] dark:text-darktext dark:after:bg-light ${
                    activo ? "after:w-3/5" : "after:w-0 hover:after:w-3/5"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button
            onClick={() => setBuscadorAbierto((v) => !v)}
            aria-label="Buscar"
            className="text-primary transition hover:text-light dark:text-darktext"
          >
            <Search size={20} />
          </button>

          {/* Hamburguesa animada — aparece exactamente igual que en el original: ≤720px */}
          <button
            className="relative hidden h-[18px] w-[26px] max-[720px]:block"
            aria-label="Abrir menú"
            onClick={() => setMenuAbierto((v) => !v)}
          >
            <span
              className={`absolute left-0 h-0.5 w-full bg-primary transition-all duration-300 dark:bg-darktext ${
                menuAbierto ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary transition-opacity duration-200 dark:bg-darktext ${
                menuAbierto ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full bg-primary transition-all duration-300 dark:bg-darktext ${
                menuAbierto ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full -translate-y-full"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Buscador desplegable — mismo vidrio esmerilado que el resto del header */}
      {buscadorAbierto && (
        <div className="border-t border-white/30 bg-light/60 py-4 backdrop-blur-lg backdrop-saturate-150 dark:border-darkline/60 dark:bg-darkcard/60">
          <div className="mx-auto w-3/5 max-[550px]:w-[80%]">
            <form onSubmit={irAResultados} className="flex gap-2">
              <input
                type="text"
                placeholder="¿Qué deseas buscar?"
                autoFocus
                value={textoBusqueda}
                onChange={(e) => setTextoBusqueda(e.target.value)}
                className="flex-1 border border-primary bg-transparent px-2 py-1.5 text-primary placeholder:text-primary focus:outline-none dark:border-darktext dark:text-darktext dark:placeholder:text-darktext/70"
              />
              <button type="submit" className="text-primary hover:text-light dark:text-darktext" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            {/* Resultados en vivo mientras escribe */}
            {textoBusqueda.trim() && (
              <div className="mt-2 max-h-80 overflow-y-auto rounded-lg bg-white/95 shadow-header backdrop-blur-sm dark:bg-darkcard/95">
                {sugerencias.length === 0 ? (
                  <p className="p-4 text-sm text-primary/60 dark:text-darktext/60">Sin resultados.</p>
                ) : (
                  <ul>
                    {sugerencias.map((r) => (
                      <li key={r.href} className="border-b border-line last:border-0 dark:border-darkline">
                        <Link
                          href={r.href}
                          className="block px-4 py-3 transition hover:bg-light/10"
                        >
                          <span className="text-xs font-semibold uppercase tracking-wide text-light">
                            {r.tipo}
                          </span>
                          <p className="font-semibold text-primary dark:text-darktext">{r.titulo}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/buscar?q=${encodeURIComponent(textoBusqueda.trim())}`}
                  className="block border-t border-line px-4 py-3 text-center text-sm font-semibold text-light hover:bg-light/10 dark:border-darkline"
                >
                  Ver todos los resultados →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menú móvil — revelado circular desde la esquina inferior
          izquierda, igual al efecto del sitio original. Siempre está
          montado (no solo cuando está abierto) para que la animación
          de cierre también se vea, no solo la de apertura. */}
      <div
        className="fixed inset-0 z-40 hidden bg-white/95 backdrop-blur-lg transition-[clip-path] duration-500 ease-in-out max-[720px]:block dark:bg-darksurface/95"
        style={{
          clipPath: menuAbierto ? "circle(150% at 0% 100%)" : "circle(0% at 0% 100%)",
          pointerEvents: menuAbierto ? "auto" : "none",
        }}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-8">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuAbierto(false)}
                className="text-2xl font-semibold text-primary dark:text-darktext"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
