import BlogSidebar from "@/components/BlogSidebar";

export const metadata = {
  title: "Nuestros Servicios",
  description:
    "Consulta optométrica, lentes formulados, gafas de sol y gafas de sol formuladas, gafas para niños, lentes progresivos, lentes de contacto y más.",
  alternates: { canonical: "/servicios" },
  openGraph: { url: "/servicios" },
};

const servicios = [
  {
    titulo: "Consulta optométrica integral:",
    texto:
      "Realizamos exámenes completos de la vista para evaluar tu salud ocular y determinar la mejor corrección visual para ti.",
  },
  {
    titulo: "Lentes formulados:",
    texto:
      "Ofrecemos lentes personalizados según tu prescripción, asegurando una visión clara y cómoda.",
  },
  {
    titulo: "Gafas de sol:",
    texto:
      "Protege tus ojos de los rayos UV con nuestras gafas de sol de alta calidad, disponibles en diversos estilos y colores.",
  },
  {
    titulo: "Gafas de sol formuladas:",
    texto:
      "Combina protección solar con corrección visual con nuestras gafas de sol formuladas, ideales para quienes necesitan lentes con prescripción.",
  },
  {
    titulo: "Gafas para niños:",
    texto:
      "Contamos con una amplia gama de gafas diseñadas especialmente para los más pequeños, asegurando comodidad y durabilidad.",
  },
  {
    titulo: "Lentes progresivos:",
    texto:
      "Ofrecemos lentes progresivos que permiten una visión clara a todas las distancias, sin la necesidad de cambiar de gafas.",
  },
  {
    titulo: "Lentes de contacto:",
    texto:
      "Disponemos de una variedad de lentes de contacto para diferentes necesidades y estilos de vida, proporcionando comodidad y una visión nítida.",
  },
];

export default function ServiciosPage() {
  return (
    <section className="mt-36 flex flex-col px-6 py-12 md:flex-row md:px-[calc((100%-1180px)/2)]">
      <aside className="hidden w-64 shrink-0 bg-light/10 py-10 px-4 md:block">
        <BlogSidebar />
      </aside>

      <div className="flex-1 space-y-4 py-4 text-primary md:py-10 md:pl-10 md:pr-5">
        <h1 className="text-3xl font-bold text-light md:text-4xl">Nuestros Servicios</h1>

        {servicios.map((s) => (
          <p key={s.titulo} className="text-justify leading-relaxed">
            <strong>{s.titulo}</strong> {s.texto}
          </p>
        ))}

        <p className="text-justify leading-relaxed">
          Si tienes alguna pregunta o necesitas más información sobre
          alguno de nuestros servicios, no dudes en contactarnos. ¡Estamos
          aquí para ayudarte a ver mejor!
        </p>
      </div>

      <aside className="mt-10 bg-light/10 p-6 md:hidden">
        <BlogSidebar />
      </aside>
    </section>
  );
}
