import { notFound } from "next/navigation";
import { productos, obtenerProducto } from "@/lib/productos";
import { obtenerCategoria } from "@/lib/categorias";
import ProductoDetalle from "@/components/ProductoDetalle";
import { generarSchemaProducto, generarSchemaMigas } from "@/lib/schema";

export function generateStaticParams() {
  return productos.map((p) => ({ categoria: p.categoria, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria: categoriaSlug, slug } = await params;
  const producto = obtenerProducto(slug);
  if (!producto || producto.categoria !== categoriaSlug) return {};

  const descripcion = producto.tipoFormula
    ? `${producto.titulo} — ${producto.uso}, ${producto.reemplazo}. Desde $${producto.precio.toLocaleString("es-CO")}.`
    : `${producto.titulo}. Desde $${producto.precio.toLocaleString("es-CO")}.`;
  const url = `/productos/${producto.categoria}/${producto.slug}`;

  return {
    title: producto.titulo,
    description: descripcion,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: producto.titulo,
      description: descripcion,
    },
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ categoria: string; slug: string }>;
}) {
  const { categoria: categoriaSlug, slug } = await params;
  const producto = obtenerProducto(slug);
  if (!producto || producto.categoria !== categoriaSlug) notFound();

  const categoria = obtenerCategoria(producto.categoria);

  const migas = generarSchemaMigas([
    { nombre: "Inicio", url: "/" },
    { nombre: "Productos", url: "/productos" },
    { nombre: categoria?.nombre ?? producto.categoria, url: `/productos/${producto.categoria}` },
    { nombre: producto.titulo, url: `/productos/${producto.categoria}/${producto.slug}` },
  ]);

  return (
    <section className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] pb-12">
      {categoria && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generarSchemaProducto(producto, categoria)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }}
      />
      <ProductoDetalle producto={producto} />
    </section>
  );
}
