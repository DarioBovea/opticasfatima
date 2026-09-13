"use client";

import { useState } from "react";
<<<<<<< HEAD
import ImagenConLupa from "@/components/ImagenConLupa";
=======
>>>>>>> 2887f7bafe79bf70e343d7bb40dfa48c8fbb82f3

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
<<<<<<< HEAD
      <ImagenConLupa src={imagenes[seleccionada]} alt={alt} className="w-full" />
=======
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imagenes[seleccionada]}
        alt={alt}
        className="max-h-[28rem] w-full object-contain"
      />
>>>>>>> 2887f7bafe79bf70e343d7bb40dfa48c8fbb82f3

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
