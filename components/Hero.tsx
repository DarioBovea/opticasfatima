export default function Hero() {
  return (
    // Posible overlay/tarjeta
    <section
      className="mt-[9em] mb-12 flex h-[34em] items-center bg-cover bg-center text-primary max-[820px]:h-[440px] max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]"
      style={{ backgroundImage: "url('/img/banner.webp')" }}
    >
      <div className="mx-auto w-4/5 max-[820px]:w-[90%]">
        <div
          className="w-full md:w-[35%] max-[820px]:!w-[46%] max-[720px]:!w-1/2"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <span className="mt-4 text-2xl font-bold max-[720px]:text-2xl">CORDIAL BIENVENIDA A</span>
          <h1 className="mt-2 font-sans text-4xl font-bold max-[720px]:text-2xl">
            ÓPTICAS FÁTIMA
          </h1>
          <p className="mt-2 text-2xl font-semibold max-[720px]:text-base">La confianza que se ve,</p>
          <p className="text-2xl font-semibold max-[720px]:text-base">la calidad que se nota.</p>
          <div className="mt-8 pl-4 flex text-center">
            <a
              href="https://api.whatsapp.com/send/?phone=573043446574&text=Hola, quiero agendar una cita!"
              target="_blank"
              rel="noopener noreferrer"
              title="Agenda tu cita"
              className="rounded-lg bg-primary px-6 py-2.5 font-bold uppercase text-white shadow-btn transition hover:bg-light max-[720px]:text-sm"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              ¡Agenda tu cita!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
