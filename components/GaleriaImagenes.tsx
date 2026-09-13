"use client";

import { useState } from "react";
import ImagenConLupa from "@/components/ImagenConLupa";

export default function GaleriaImagenes({
  imagenes,
  alt,
}: {
  imagenes: string[]; // la primera es la principal, el resto son adicionales
  alt: string;
}) {
  const [seleccionada, setSeleccionada] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4" data-aos="fade-right">
      <ImagenConLupa src={imagenes[seleccionada]} alt={alt} className="w-full" />

      {/* Las miniaturas solo aparecen si hay más de 1 imagen */}
      {imagenes.length > 1 && (
        <div className="flex gap-3">
          {imagenes.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setSeleccionada(i)}
              aria-label={`Ver foto ${i + 1} de ${alt}`}
              className={`overflow-hidden rounded-lg border-2 p-1 transition ${
                seleccionada === i
                  ? "border-primary dark:border-light"
                  : "border-transparent hover:border-line dark:hover:border-darkline"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-16 w-16 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
