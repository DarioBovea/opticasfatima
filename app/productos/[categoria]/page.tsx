import { notFound } from "next/navigation";
import { categorias, obtenerCategoria } from "@/lib/categorias";
import { obtenerProductosPorCategoria } from "@/lib/productos";
import CatalogoProductos from "@/components/CatalogoProductos";

// Genera una ruta por cada categoría (5 por ahora), tengan o no
// productos cargados todavía.
export function generateStaticParams() {
  return categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria: categoriaSlug } = await params;
  const categoria = obtenerCategoria(categoriaSlug);
  if (!categoria) return {};
  return {
    title: categoria.nombre,
    description: categoria.descripcion,
    alternates: { canonical: `/productos/${categoria.slug}` },
    openGraph: { url: `/productos/${categoria.slug}` },
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria: categoriaSlug } = await params;
  const categoria = obtenerCategoria(categoriaSlug);
  if (!categoria) notFound();

  const productosCategoria = obtenerProductosPorCategoria(categoria.slug);

  return (
    <section className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="py-8 text-3xl font-bold text-primary dark:text-darktext">{categoria.nombre}</h1>

        {productosCategoria.length === 0 ? (
          <p className="text-primary dark:text-darktext">
            Todavía no tenemos {categoria.nombreSingular} cargados en el catálogo. Escríbenos por
            WhatsApp si buscas algo en particular.
          </p>
        ) : (
          <CatalogoProductos productos={productosCategoria} />
        )}
      </div>
    </section>
  );
}
