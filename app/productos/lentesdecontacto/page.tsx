import { productos } from "@/lib/productos";
import CatalogoLentesContacto from "@/components/CatalogoLentesContacto";

export const metadata = {
  title: "Lentes de Contacto",
  description:
    "Catálogo de lentes de contacto: filtra por marca, defecto visual (miopía, astigmatismo, presbicia) y tipo de reemplazo.",
  alternates: { canonical: "/productos/lentesdecontacto" },
  openGraph: { url: "/productos/lentesdecontacto" },
};

export default function LentesDeContactoPage() {
  return (
    <section className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="py-8 text-3xl font-bold text-primary">Lentes de Contacto</h1>
        <CatalogoLentesContacto productos={productos} />
      </div>
    </section>
  );
}
