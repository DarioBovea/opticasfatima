import { notFound } from "next/navigation";
import Link from "next/link";
import { articulos, obtenerArticulo } from "@/lib/articulos";
import PaginaConSidebar from "@/components/PaginaConSidebar";
import { generarSchemaArticulo, generarSchemaMigas } from "@/lib/schema";

export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

// Codigo anterior
// export function generateMetadata({ params }: { params: { slug: string } }) {
//   const articulo = obtenerArticulo(params.slug);
//   if (!articulo) return {};
//   return {
//     title: articulo.titulo,
//     description: articulo.descripcion,
//     alternates: { canonical: `/blog/${articulo.slug}` },
//     openGraph: {
//       type: "article",
//       url: `/blog/${articulo.slug}`,
//       title: articulo.titulo,
//       description: articulo.descripcion,
//     },
//   };
// }

//  Código nuevo corregido:
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articulo = obtenerArticulo(slug);
  
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

  const otros = articulos.filter((a) => a.slug !== articulo.slug);

  const sidebar = (
    <ul className="m-0 lg:pt-12 flex list-none flex-col gap-3 p-0">
      {otros.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/blog/${a.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-light hover:shadow-md dark:border-darkline dark:bg-darkcard"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-light transition group-hover:bg-primary" />
            <span className="font-medium text-primary transition group-hover:text-light dark:text-darktext">
              {a.categoria}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <PaginaConSidebar sidebar={sidebar}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generarSchemaArticulo(articulo)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generarSchemaMigas([
              { nombre: "Inicio", url: "/" },
              { nombre: "Blog", url: "/blog" },
              { nombre: articulo.titulo, url: `/blog/${articulo.slug}` },
            ])
          ),
        }}
      />
      <h1 className="mb-6 text-3xl font-bold text-light md:text-4xl">
          {articulo.titulo}
        </h1>

        <div className="space-y-4 text-primary dark:text-darktext">
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
