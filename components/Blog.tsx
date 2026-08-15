import Link from "next/link";
import { articulos } from "@/lib/articulos";

const destacados = ["como-prevenir-la-fatiga-visual", "gafas-progresivas", "vision-del-futuro"];

export default function Blog() {
  const items = destacados
    .map((slug) => articulos.find((a) => a.slug === slug))
    .filter(Boolean);

  return (
    <article className="mb-24 flex flex-wrap justify-center">
      {items.map((a) => (
        <div key={a!.slug} className="m-4 w-full sm:w-[calc(50%-32px)] lg:w-[calc(33.3%-32px)]">
          <Link
            href={`/blog/${a!.slug}`}
            title={a!.categoria}
            className="block rounded-lg bg-[#F2F2F2] px-5 pb-5 pt-10 text-primary transition hover:shadow-[5px_5px_10px_2px_rgba(52,52,52,0.2)]"
          >
            <h3 className="mb-8 text-center text-2xl hover:text-light">{a!.categoria}</h3>
            <div
              className="mb-6 h-0 w-full bg-cover bg-center pb-[78%]"
              style={{
                backgroundImage: `url('${a!.imagen}')`,
                borderRadius: "10px 50px 30px 40px",
              }}
            />
            <h4 className="text-lg hover:text-light">{a!.titulo}</h4>
            <p className="text-justify leading-relaxed">{a!.descripcion}</p>
            <span className="mt-4 inline-block rounded-lg border-2 border-primary px-6 py-2 text-sm font-bold uppercase transition hover:bg-primary hover:text-white">
              Leer más
            </span>
          </Link>
        </div>
      ))}
    </article>
  );
}
