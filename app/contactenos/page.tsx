import PaginaSimple from "@/components/PaginaSimple";

export const metadata = {
  title: "Contáctenos",
  description: "Coloquese en contacto con nosotros, estamos para servirle",
  alternates: { canonical: "/contactenos" },
  openGraph: { url: "/contactenos" },
};

export default function ContactenosPage() {
  return (
    <PaginaSimple>
      <h1 className="text-3xl font-bold text-light md:text-4xl">Contáctenos</h1>
        <h2 className="my-4 text-2xl font-bold">Descripción Breve</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.9372101203603!2d-77.27992402428733!3d1.2041599620252716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed499bb3bb351%3A0xaa3b88dece7303ed!2sCra.%2015%20%2314-43%2C%20Pasto%2C%20Nari%C3%B1o!5e0!3m2!1ses-419!2sco!4v1729625824257!5m2!1ses-419!2sco"
          width="80%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg my-8 mx-auto"
        />

        <div className="w-4/5 mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="mx-6">
            <p>Carrera 18 # 19b - 06 Consultorio 2</p>
            <p>Teléfonos: 320 578 71 43 - 304 344 65 74</p>
            <p>Correo: info@opticasfatima.com</p>
            <p>Website: opticasfatima.com</p>
          </div>
          <div className="mx-6">
            <p>
              Horarios:
              <br />
              De lunes a viernes,
              <br />
              7:30am a 12:00am - 2:00pm a 5:30pm
              <br />
              Sábado,
              <br />
              8:00 am a 12:00 pm
            </p>
          </div>
        </div>
    </PaginaSimple>
  );
}
