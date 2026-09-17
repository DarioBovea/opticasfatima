import Link from "next/link";
import { categorias } from "@/lib/categorias";
import { productos } from "@/lib/productos";

export const metadata = {
  title: "Productos",
  description: "Lentes de contacto, gafas de sol, monturas, gotas y soluciones.",
  alternates: { canonical: "/productos" },
  openGraph: { url: "/productos" },
};

export default function ProductosPage() {
  return (
    <section className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="py-8 text-3xl font-bold text-primary dark:text-darktext">Productos</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => {
            const tieneProductos = productos.some((p) => p.categoria === c.slug);
            return (
              <Link
                key={c.slug}
                href={`/productos/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-darkline dark:bg-darkcard dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                data-aos="fade-up"
              >
                <h2 className="text-lg font-bold text-primary dark:text-darktext">{c.nombre}</h2>
                <p className="mt-2 flex-1 text-sm text-primary/70 dark:text-darktext/70">
                  {c.descripcion}
                </p>
                <span
                  className={`mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold transition group-hover:gap-2 ${
                    tieneProductos ? "text-primary group-hover:text-light dark:text-darktext" : "text-primary/40 dark:text-darktext/40"
                  }`}
                >
                  {tieneProductos ? (
                    <>
                      Ver catálogo <span aria-hidden>→</span>
                    </>
                  ) : (
                    "Próximamente"
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
