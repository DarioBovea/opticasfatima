import Link from "next/link";
import { articulos } from "@/lib/articulos";
import { FeaturedServicesSeparator } from "@/components/Separador";

const destacados = ["como-prevenir-la-fatiga-visual", "gafas-progresivas", "vision-del-futuro"];

export default function Blog() {
  const items = destacados
    .map((slug) => articulos.find((a) => a.slug === slug))
    .filter(Boolean);

  return (      
      <article className="w-full mx-auto md:w-4/5 2xl:w-[70%] mb-24 flex flex-wrap justify-center">
        <div className="w-full mb-12" data-aos="slide-right">
          <FeaturedServicesSeparator title="Nuestro Blog" />
        </div>
        
        {items.map((a, i) => (
          <div
            key={a!.slug}
            className="m-4 w-[calc(33.3%-32px)] max-[820px]:w-[calc(50%-32px)] max-[720px]:w-[calc(100%-32px)]"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <Link
              href={`/blog/${a!.slug}`}
              title={a!.categoria}
              className="relative min-h-[598px] block border border-solid border-[#0d3857] bg-transparent rounded-[12px] px-5 pb-5 pt-10 text-primary transition hover:shadow-[5px_5px_10px_2px_rgba(52,52,52,0.2)] dark:text-darktext dark:hover:shadow-[5px_5px_10px_2px_rgba(0,0,0,0.4)]"
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
                <span className="absolute bottom-8 left-4 min-[320px]:bottom-4 inline-block rounded-lg border-2 border-primary px-6 py-2 text-sm font-bold uppercase transition hover:bg-primary hover:text-white dark:border-light dark:text-darktext dark:hover:bg-light dark:hover:text-primary">
                Leer más
              </span>
            </Link>
          </div>
        ))}
      </article>
  );
}
