import BlogSidebar from "@/components/BlogSidebar";
import FormularioRegistro from "@/components/FormularioRegistro";

export const metadata = {
  title: "Registro",
  description: "Regístrate y recibe información y promociones.",
  alternates: { canonical: "/registro" },
  openGraph: { url: "/registro" },
};

export default function RegistroPage() {
  return (
    <section className="mt-36 flex flex-col px-6 py-12 md:flex-row md:px-[calc((100%-1180px)/2)]">
      <aside className="hidden w-64 shrink-0 bg-light/10 py-10 pr-10 md:block">
        <BlogSidebar />
      </aside>

      <div className="flex-1 py-4 text-primary md:py-10 md:pl-10 md:pr-5">
        <h1 className="text-3xl font-bold text-light md:text-4xl">¡Regístrate!</h1>
        <h2 className="mt-2 text-xl font-bold">Regístrate y gana con nosotros</h2>
        <p className="mt-4 leading-relaxed">
          Registra tus datos y participa en descuentos y promociones.
        </p>

        <FormularioRegistro />
      </div>

      <aside className="mt-10 bg-light/10 p-6 md:hidden">
        <BlogSidebar />
      </aside>
    </section>
  );
}
