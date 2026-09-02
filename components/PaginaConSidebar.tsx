import type { ReactNode } from "react";
import BlogSidebar from "@/components/BlogSidebar";

// Replica .pagina-contenido: en el original NO hay una versión "móvil"
// duplicada del sidebar — es un solo bloque que aparece PRIMERO (arriba
// del contenido) en pantallas angostas, porque el contenedor solo se
// vuelve flex (lado a lado) a partir de 1024px. Antes de esto, esta
// página tenía 2 <aside> (uno oculto en escritorio, otro en móvil).
export default function PaginaConSidebar({
  children,
  sidebar = <BlogSidebar />,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  return (
    <section
      className={[
        "mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]",
        "flex flex-col lg:flex-row",
        "px-6 py-12 lg:px-[calc((100%-1180px)/2)] min-[1920px]:px-[calc((100%-1640px)/2)]",
      ].join(" ")}
    >
      {/* Padding real del original (60px 60px 0 0) solo desde 1024px —
          en móvil usamos el mismo margen de 24px (px-6) que ya usa el
          resto del sitio, en vez de heredar el fijo del original. */}
      <aside
        className={[
          "w-full shrink-0 bg-light/10 p-6",
          "lg:relative lg:-left-12 lg:w-[15%] lg:p-[128px_64px_64px_0px]",
          "min-[1920px]:p-[60px_140px_0px_0px]",
        ].join(" ")}
      >
        {sidebar}
      </aside>

      {/* Mismo criterio para el contenido: el original usa un padding
          fijo (60px 20px 60px 60px) sin importar el tamaño de pantalla,
          pero eso se siente grande en celulares — en ≤1023px usamos
          24px, y a partir de 1024px sí queda igual al original. */}
      <div className="flex-1 space-y-4 p-6 text-primary lg:p-[60px_20px_60px_60px]">
        {children}
      </div>
    </section>
  );
}
