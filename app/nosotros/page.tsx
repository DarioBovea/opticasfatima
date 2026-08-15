import BlogSidebar from "@/components/BlogSidebar";

export const metadata = {
  title: "Sobre Nosotros",
  description:
    "Somos una óptica que no solo se dedica a vender gafas, sino que se enfoca en el cuidado integral de la salud visual de sus pacientes.",
  alternates: { canonical: "/nosotros" },
  openGraph: { url: "/nosotros" },
};

export default function NosotrosPage() {
  return (
    <section className="mt-36 flex flex-col px-6 py-12 md:flex-row md:px-[calc((100%-1180px)/2)]">
      <aside className="hidden w-64 shrink-0 bg-light/10 py-10 pr-10 md:block">
        <BlogSidebar />
      </aside>

      <div className="flex-1 space-y-4 py-4 text-primary md:py-10 md:pl-10 md:pr-5">
        <h1 className="text-3xl font-bold text-light md:text-4xl">Sobre Nosotros</h1>

        <h2 className="pt-2 text-2xl font-bold">Innovación y Cuidado en Nuestra Óptica</h2>
        <p className="text-justify leading-relaxed">
          Bienvenidos a nuestra óptica, donde la claridad de la visión es
          nuestra pasión y compromiso. Hoy queremos hablarles sobre la
          importancia de una óptica que no solo se dedica a vender gafas,
          sino que se enfoca en el cuidado integral de la salud visual de
          sus pacientes.
        </p>

        <h3 className="w-full rounded bg-light/30 p-4 text-xl font-bold md:w-[70%]">
          Innovación Tecnológica para una Visión Perfecta
        </h3>
        <p className="text-justify leading-relaxed">
          En nuestra óptica, entendemos que la tecnología es una aliada
          indispensable. Por eso, contamos con equipos de última generación
          para exámenes visuales que garantizan un diagnóstico preciso.
          Nuestros optómetras están en constante capacitación para dominar
          estas tecnologías y brindar una atención de calidad.
        </p>

        <h3 className="w-full rounded bg-light/30 p-4 text-xl font-bold md:w-[70%]">
          Una Amplia Gama de Opciones para Todos
        </h3>
        <p className="text-justify leading-relaxed">
          Sabemos que cada persona es única y, por lo tanto, sus
          necesidades visuales también lo son. Ofrecemos una variedad de
          lentes correctivos, gafas de sol y lentes de contacto, de marcas
          reconocidas y diseñadores emergentes, para asegurar que cada
          cliente encuentre el par perfecto que refleje su estilo personal.
        </p>

        <h3 className="w-full rounded bg-light/30 p-4 text-xl font-bold md:w-[70%]">
          Compromiso con la Salud Visual
        </h3>
        <p className="text-justify leading-relaxed">
          Más allá de la moda, nuestra misión es proteger y mejorar su
          visión. Realizamos exámenes completos que no solo determinan la
          prescripción adecuada, sino que también detectan posibles
          condiciones oculares. La prevención y el cuidado temprano son
          clave para mantener una buena salud visual a largo plazo.
        </p>

        <h3 className="w-full rounded bg-light/30 p-4 text-xl font-bold md:w-[70%]">
          Un Equipo que Se Preocupa por Usted
        </h3>
        <p className="text-justify leading-relaxed">
          Nuestro equipo de profesionales no solo está altamente
          calificado, sino que también tiene un compromiso genuino con el
          bienestar de nuestros clientes. Desde el momento en que entra a
          nuestra tienda, nuestro objetivo es que se sienta comprendido,
          cuidado y satisfecho con su experiencia.
        </p>

        <p className="text-justify leading-relaxed">
          <strong>En nuestra óptica</strong>, cada detalle cuenta. Desde la
          selección de nuestros productos hasta la formación de nuestro
          equipo, todo está pensado para ofrecerle la mejor experiencia
          posible. Le invitamos a visitarnos y descubrir por qué somos la
          opción preferida para el cuidado de su visión.
        </p>
      </div>

      <aside className="mt-10 bg-light/10 p-6 md:hidden">
        <BlogSidebar />
      </aside>
    </section>
  );
}
