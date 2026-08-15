import Link from "next/link";
import { buscar } from "@/lib/busqueda";

export const metadata = {
  title: "Resultados de búsqueda",
  robots: { index: false, follow: true },
};

const colorTipo: Record<string, string> = {
  Página: "bg-line text-primary",
  Blog: "bg-light/20 text-primary",
  Producto: "bg-primary text-white",
};

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const consulta = searchParams.q ?? "";
  const resultados = buscar(consulta);

  return (
    <section className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-primary">
          Resultados para &ldquo;{consulta}&rdquo;
        </h1>
        <p className="mb-8 text-sm text-primary/60">
          {resultados.length} resultado{resultados.length !== 1 && "s"}
        </p>

        {resultados.length === 0 ? (
          <p className="text-primary">
            No encontramos nada con esa búsqueda. Prueba con otra palabra, o revisa
            nuestro{" "}
            <Link href="/productos/lentesdecontacto" className="underline text-light">
              catálogo de lentes de contacto
            </Link>
            .
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {resultados.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="block rounded-lg border border-line bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-light hover:shadow-md"
                >
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${colorTipo[r.tipo]}`}
                  >
                    {r.tipo}
                  </span>
                  <p className="mt-2 font-bold text-primary">{r.titulo}</p>
                  <p className="text-sm text-primary/70">{r.descripcion}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
