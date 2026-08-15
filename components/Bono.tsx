import Link from "next/link";

export default function Bono() {
  return (
    <section className="mb-16 py-12">
      <div
        className="mx-auto w-[70%] rounded-xl bg-cover bg-center p-9 shadow-header"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent, #b3b3b3), url('/img/promocion.webp')",
        }}
      >
        <div className="relative w-full text-primary md:w-[45%]">
          <h3 className="mb-[-10px] text-6xl font-extrabold">BONO</h3>
          <h4 className="mb-2 text-5xl font-extrabold">REGALO</h4>
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2">
            <p className="m-0 text-4xl font-black">50MIL</p>
            <p className="text-lg">¡Te damos un regalo por tu primera compra!</p>
          </div>
          <Link
            href="/bono-regalo"
            title="Bono Regalo"
            className="inline-block rounded-lg bg-primary px-6 py-2.5 font-bold uppercase text-white shadow-btn transition hover:bg-light"
          >
            Leer Más
          </Link>
        </div>
      </div>
    </section>
  );
}
