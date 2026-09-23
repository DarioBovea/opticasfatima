"use client";

import { useRef, useState, type MouseEvent } from "react";

const ZOOM = 2.5; // cuánto se amplía dentro de la lupa
const TAMANO_LUPA = 400;

export default function ImagenConLupa({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  const [posLupa, setPosLupa] = useState({ x: 0, y: 0 });
  const [fondo, setFondo] = useState({ tamano: "0px 0px", posicion: "0px 0px" });

  function manejarMovimiento(e: MouseEvent<HTMLDivElement>) {
    const rect = contenedorRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosLupa({ x, y });

    // La imagen ampliada se desplaza en sentido contrario al cursor
    // dentro del círculo, recortada para no dejar ver bordes en blanco.
    const bgX = Math.min(Math.max(x * ZOOM - TAMANO_LUPA / 2, 0), rect.width * ZOOM - TAMANO_LUPA);
    const bgY = Math.min(Math.max(y * ZOOM - TAMANO_LUPA / 2, 0), rect.height * ZOOM - TAMANO_LUPA);

    setFondo({
      tamano: `${rect.width * ZOOM}px ${rect.height * ZOOM}px`,
      posicion: `-${bgX}px -${bgY}px`,
    });
  }

  return (
    <div
      ref={contenedorRef}
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setActivo(true)}
      onMouseLeave={() => setActivo(false)}
      onMouseMove={manejarMovimiento}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="max-h-[28rem] w-full cursor-zoom-in object-contain" />

      {activo && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-10 hidden border-2 border-white bg-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:block"
          style={{
            width: TAMANO_LUPA,
            height: TAMANO_LUPA,
            left: posLupa.x - TAMANO_LUPA / 2,
            top: posLupa.y - TAMANO_LUPA / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: fondo.tamano,
            backgroundPosition: fondo.posicion,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}
