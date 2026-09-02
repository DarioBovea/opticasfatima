import Link from "next/link";

export default function Bono() {
  return (
    <section className="mb-16 py-12">
      <div
        className="mx-auto w-[70%] rounded-xl bg-cover bg-center p-9 shadow-header max-[820px]:w-[80%]"
        style={{
          backgroundImage:
            "linear-gradient(to left, transparent, #b3b3b3), url('/img/promocion.webp')",
        }}
      >
        {/* .slide en el original: 45% base → 50% en ≤820px */}
        <div className="relative w-full text-primary md:w-[45%] max-[820px]:!w-1/2">
          <h3 className="mb-[-10px] text-6xl font-extrabold max-[820px]:text-[2.5em]">BONO</h3>
          <h4 className="mb-2 text-5xl font-extrabold max-[820px]:text-[1.7em]">REGALO</h4>

          {/* .bono-contenido: flex en escritorio → block (apilado) en ≤720px */}
          <div className="mb-5 flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2 max-[820px]:mb-4 max-[820px]:px-1.5 max-[820px]:py-0 max-[720px]:!block max-[720px]:!px-3 max-[720px]:!py-1.5 max-[720px]:!text-center">
            <p className="m-0 text-4xl font-black max-[820px]:text-2xl">50MIL</p>
            <p className="text-lg max-[820px]:text-base">¡Te damos un regalo por tu primera compra!</p>
          </div>

          <Link
            href="/bono-regalo"
            title="Bono Regalo"
            className="inline-block rounded-lg bg-primary px-6 py-2.5 font-bold uppercase text-white shadow-btn transition hover:bg-light max-[820px]:text-sm"
          >
            Leer Más
          </Link>
        </div>
      </div>
    </section>
  );
}
