export default function Hero() {
  return (
    // Posible overlay/tarjeta
    <section
      className="mt-[9em] mb-12 flex h-[34em] items-center bg-cover bg-center text-primary"
      style={{ backgroundImage: "url('/img/banner.webp')" }}
    >
      <div className="mx-auto w-4/5">
        <div className="w-full md:w-[35%]">
          <span className="text-2xl font-bold">CORDIAL BIENVENIDA A</span>
          <h1 className="mt-2 font-sans text-4xl font-extrabold">ÓPTICAS FÁTIMA</h1>
          <p className="mt-4 text-2xl font-bold">La confianza que se ve,</p>
          <p className="text-2xl font-bold">la calidad que se nota.</p>
          <div className="mt-8 flex justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=573205787143&text=Hola, quiero agendar una cita!"
              target="_blank"
              rel="noopener noreferrer"
              title="Agenda tu cita"
              className="rounded-lg bg-primary px-6 py-2.5 font-bold uppercase text-white shadow-btn transition hover:bg-light"
            >
              ¡Agenda tu cita!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
