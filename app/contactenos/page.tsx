import BlogSidebar from "@/components/BlogSidebar";

export const metadata = {
  title: "Contáctenos",
  description: "Coloquese en contacto con nosotros, estamos para servirle",
  alternates: { canonical: "/contactenos" },
  openGraph: { url: "/contactenos" },
};

export default function ContactenosPage() {
  return (
    <section className="mt-36 flex flex-col px-6 py-12 md:flex-row md:px-[calc((100%-1180px)/2)]">
      <aside className="hidden w-64 shrink-0 bg-light/10 py-10 px-4 md:block">
        <BlogSidebar />
      </aside>

      <div className="flex-1 space-y-6 py-4 text-primary md:py-10 md:pl-10 md:pr-5">
        <h1 className="text-3xl font-bold text-light md:text-4xl">Contáctenos</h1>
        <h2 className="text-2xl font-bold">Descripción Breve</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9372101203603!2d-77.27992402428733!3d1.2041599620252716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed499bb3bb351%3A0xaa3b88dece7303ed!2sCra.%2015%20%2314-43%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses-419!2sco!4v1729625824257!5m2!1ses-419!2sco"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p>Carrera 15 # 14 - 43</p>
            <p className="mt-2">
              Horarios:
              <br />
              De lunes a viernes,
              <br />
              7:00 am a 6:00 pm
              <br />
              Sábado,
              <br />
              8:00 am a 12:00 pm
            </p>
          </div>
          <div>
            <p>Teléfonos: 320 578 71 43 - 317 797 99 76</p>
            <p>Correo: info@opticasfatima.com</p>
            <p>Website: opticasfatima.com</p>
          </div>
        </div>
      </div>

      <aside className="mt-10 bg-light/10 p-6 md:hidden">
        <BlogSidebar />
      </aside>
    </section>
  );
}
