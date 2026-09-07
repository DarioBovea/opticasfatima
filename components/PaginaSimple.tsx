import type { ReactNode } from "react";

// Mismo margen superior y ancho de contenedor que PaginaConSidebar,
// pero a todo el ancho — para páginas que no necesitan el sidebar de
// artículos del blog (Nosotros, Servicios, Contáctenos, Bono Regalo).
export default function PaginaSimple({ children }: { children: ReactNode }) {
  return (
    <section
      className={[
        "mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]",
        "px-6 py-12 lg:px-[calc((100%-1180px)/2)] min-[1920px]:px-[calc((100%-1640px)/2)]",
      ].join(" ")}
    >
      <div className="space-y-4 text-primary dark:text-darktext" data-aos="fade-up">{children}</div>
    </section>
  );
}
