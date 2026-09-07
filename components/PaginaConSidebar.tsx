import type { ReactNode } from "react";

// Ya solo la usan los artículos del blog (/blog/[slug]) — Nosotros,
// Servicios, Contáctenos y Bono Regalo pasaron a PaginaSimple.tsx
// (a todo el ancho, sin sidebar).
export default function PaginaConSidebar({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <section
      className={[
        "mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]",
        "flex flex-col lg:flex-row",
        "px-6 py-12 lg:px-[calc((100%-1180px)/2)] min-[1920px]:px-[calc((100%-1640px)/2)]",
      ].join(" ")}
    >
      {/* El padding real del original (128px arriba) asumía una
          estructura de header distinta a la que terminamos usando —
          sumado al espacio que ya reserva esta sección para el header
          fijo, generaba un hueco enorme antes del primer enlace.
          Alineo el padding superior del sidebar con el del contenido
          (60px) para que ambos arranquen a la misma altura. */}
      <aside
        className={[
          "w-full shrink-0 bg-light/10 p-6",
          "lg:relative lg:-left-12 lg:w-[15%] lg:p-[60px_64px_64px_0px]",
          "min-[1920px]:p-[60px_140px_0px_0px]",
          "dark:bg-darkcard/40",
        ].join(" ")}
        data-aos="fade-down"
      >
        {sidebar}
      </aside>

      {/* Mismo criterio para el contenido: el original usa un padding
          fijo (60px 20px 60px 60px) sin importar el tamaño de pantalla,
          pero eso se siente grande en celulares — en ≤1023px usamos
          24px, y a partir de 1024px sí queda igual al original. */}
      <div className="flex-1 space-y-4 p-6 text-primary dark:text-darktext lg:p-[60px_20px_60px_60px]" data-aos="fade-up">
        {children}
      </div>
    </section>
  );
}
