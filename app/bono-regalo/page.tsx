import PaginaSimple from "@/components/PaginaSimple";
import FormularioBono from "@/components/FormularioBono";

export const metadata = {
  title: "Bono Regalo",
  description: "¡Te damos un regalo por tu primera compra!",
  alternates: { canonical: "/bono-regalo" },
  openGraph: { url: "/bono-regalo" },
};

export default function BonoRegaloPage() {
  return (
    <PaginaSimple>
      <h1 className="text-3xl font-bold text-light md:text-4xl">
          Te regalamos un bono de $50.000
        </h1>
        <h2 className="mt-2 text-xl font-bold">Para que compres tus primeras gafas</h2>

        {/* Misma tarjeta que en el home (components/Bono.tsx), reutilizando
            los mismos breakpoints reales (.bono-dos, .slide, .bono-contenido) */}
        <div
          className="my-8 w-[90%] rounded-xl bg-cover bg-center p-9 shadow-header"
          style={{
            backgroundImage:
              "linear-gradient(to left, transparent, #b3b3b3), url('/img/promocion.webp')",
          }}
        >
          <div className="w-full md:w-[45%] max-[820px]:!w-1/2">
            <h3 className="mb-[-10px] text-6xl font-extrabold max-[820px]:text-[2.5em]">BONO</h3>
            <h4 className="mb-2 text-5xl font-extrabold max-[820px]:text-[1.7em]">REGALO</h4>
            <div className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2 max-[820px]:mb-4 max-[820px]:px-1.5 max-[820px]:py-0 max-[720px]:!block max-[720px]:!px-3 max-[720px]:!py-1.5 max-[720px]:!text-center">
              <p className="m-0 text-4xl font-black max-[820px]:text-2xl">50MIL</p>
              <p className="text-lg max-[820px]:text-base">¡Te damos un regalo por tu primera compra!</p>
            </div>
          </div>
        </div>

        <FormularioBono />
    </PaginaSimple>
  );
}
