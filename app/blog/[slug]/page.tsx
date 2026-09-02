import { notFound } from "next/navigation";
import Link from "next/link";
import { articulos, obtenerArticulo } from "@/lib/articulos";
import PaginaConSidebar from "@/components/PaginaConSidebar";

// Genera las 8 rutas estáticas en build time: /blog/lentes-progresivos, etc.
export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const articulo = obtenerArticulo(params.slug);
  if (!articulo) return {};
  return {
    title: articulo.titulo,
    description: articulo.descripcion,
    alternates: { canonical: `/blog/${articulo.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${articulo.slug}`,
      title: articulo.titulo,
      description: articulo.descripcion,
    },
  };
}

export default function ArticuloPage({ params }: { params: { slug: string } }) {
  const articulo = obtenerArticulo(params.slug);
  if (!articulo) notFound();

  // El menú lateral muestra los otros artículos (igual al sidebar original)
  const otros = articulos.filter((a) => a.slug !== articulo.slug);

  const sidebar = (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {otros.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/blog/${a.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-light hover:shadow-md"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-light transition group-hover:bg-primary" />
            <span className="font-medium text-primary transition group-hover:text-light">
              {a.categoria}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <PaginaConSidebar sidebar={sidebar}>
      <h1 className="mb-6 text-3xl font-bold text-light md:text-4xl">
          {articulo.titulo}
        </h1>

        <div className="space-y-4 text-primary">
          {articulo.contenido.map((bloque, i) => {
            if (bloque.tipo === "h2") {
              return (
                <h2 key={i} className="pt-4 text-2xl font-bold">
                  {bloque.texto}
                </h2>
              );
            }
            if (bloque.tipo === "h3") {
              return (
                <h3
                  key={i}
                  className="w-full rounded bg-light/30 p-4 text-xl font-bold md:w-[70%]"
                >
                  {bloque.texto}
                </h3>
              );
            }
            if (bloque.tipo === "h4") {
              return (
                <h4 key={i} className="text-lg font-bold">
                  {bloque.texto}
                </h4>
              );
            }
            return (
              <p key={i} className="text-justify leading-relaxed">
                {bloque.texto}
              </p>
            );
          })}
        </div>
    </PaginaConSidebar>
  );
}
