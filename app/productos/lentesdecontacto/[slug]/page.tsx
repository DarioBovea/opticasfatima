import { notFound } from "next/navigation";
import { productos, obtenerProducto } from "@/lib/productos";
import ProductoDetalle from "@/components/ProductoDetalle";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const producto = obtenerProducto(params.slug);
  if (!producto) return {};
  const descripcion = `${producto.titulo} — ${producto.uso}, ${producto.reemplazo}. Desde $${producto.precio.toLocaleString("es-CO")}.`;
  const url = `/productos/lentesdecontacto/${producto.slug}`;
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

export default function ProductoPage({ params }: { params: { slug: string } }) {
  const producto = obtenerProducto(params.slug);
  if (!producto) notFound();

  return (
    <section className="mt-36 pb-12">
      <ProductoDetalle producto={producto} />
    </section>
  );
}
