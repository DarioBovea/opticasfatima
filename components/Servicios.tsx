import Link from "next/link";

type Servicio = {
  titulo: string;
  imagen: string;
  href: string;
  interno: boolean;
};

// Coloca estas imágenes en /public/img/ con estos mismos nombres
// (son los mismos nombres de archivo del sitio original).
const servicios: Servicio[] = [
  { titulo: "Lentes Formulados", imagen: "/img/lentes-formulados.jpg", href: "/blog/lentes-formulados", interno: true },
  { titulo: "Gafas De Sol", imagen: "/img/gafas-de-sol.jpg", href: "/blog/gafas-de-sol", interno: true },
  { titulo: "Gafas De Sol Formuladas", imagen: "/img/lentessolformulados.jpg", href: "/blog/gafas-de-sol-formuladas", interno: true },
  { titulo: "Gafas para Niños", imagen: "/img/gafasparaninos.jpg", href: "/blog/gafas-para-ninos", interno: true },
  { titulo: "Lentes Progresivos", imagen: "/img/lentes-progresivos.jpg", href: "/blog/lentes-progresivos", interno: true },
  { titulo: "Lentes De Contacto", imagen: "/img/lentesdecontacto.jpg", href: "/productos/lentesdecontacto", interno: true },
];

export default function Servicios() {
  return (
    <section className="mb-24 flex flex-wrap">
      {servicios.map((s) => (
        <div key={s.titulo} className="group relative w-full sm:w-1/2 lg:w-1/3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.imagen} alt={s.titulo} className="h-full w-full object-cover" />

          <div className="absolute inset-0 bg-[rgba(52,52,52,0.4)] transition group-hover:bg-[rgba(32,36,18,0.1)]" />

          <div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 className="m-0 text-3xl font-bold text-white [text-shadow:4px_4px_10px_rgba(32,36,29,0.8)]">
              {s.titulo}
            </h2>
            <div className="invisible mt-0 h-0 opacity-0 transition-all duration-300 group-hover:visible group-hover:mt-[22px] group-hover:h-[30px] group-hover:opacity-100">
              {s.interno ? (
                <Link
                  href={s.href}
                  title={s.titulo}
                  className="rounded-lg bg-primary px-6 py-2 text-sm font-bold uppercase text-white shadow-btn transition hover:bg-light"
                >
                  Leer Más
                </Link>
              ) : (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.titulo}
                  className="rounded-lg bg-primary px-6 py-2 text-sm font-bold uppercase text-white shadow-btn transition hover:bg-light"
                >
                  Leer Más
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
