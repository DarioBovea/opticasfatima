import BlogSidebar from "@/components/BlogSidebar";
import FormularioBono from "@/components/FormularioBono";

export const metadata = {
  title: "Bono Regalo",
  description: "¡Te damos un regalo por tu primera compra!",
  alternates: { canonical: "/bono-regalo" },
  openGraph: { url: "/bono-regalo" },
};

export default function BonoRegaloPage() {
  return (
    <section className="mt-36 flex flex-col px-6 py-12 md:flex-row md:px-[calc((100%-1180px)/2)]">
      <aside className="hidden w-64 shrink-0 bg-light/10 py-10 pr-10 md:block">
        <BlogSidebar />
      </aside>

      <div className="flex-1 py-4 text-primary md:py-10 md:pl-10 md:pr-5">
        <h1 className="text-3xl font-bold text-light md:text-4xl">
          Te regalamos un bono de $50.000
        </h1>
        <h2 className="mt-2 text-xl font-bold">Para que compres tus primeras gafas</h2>

        {/* Misma tarjeta que en el home (components/Bono.tsx) */}
        <div
          className="my-8 w-full rounded-xl bg-cover bg-center p-9 shadow-header md:w-[90%]"
          style={{
            backgroundImage:
              "linear-gradient(to left, transparent, #b3b3b3), url('/img/promocion.webp')",
          }}
        >
          <div className="w-full md:w-[45%]">
            <h3 className="mb-[-10px] text-6xl font-extrabold">BONO</h3>
            <h4 className="mb-2 text-5xl font-extrabold">REGALO</h4>
            <div className="flex items-center gap-3 rounded-xl bg-white/70 px-3 py-2">
              <p className="m-0 text-4xl font-black">50MIL</p>
              <p className="text-lg">¡Te damos un regalo por tu primera compra!</p>
            </div>
          </div>
        </div>

        <FormularioBono />
      </div>

      <aside className="mt-10 bg-light/10 p-6 md:hidden">
        <BlogSidebar />
      </aside>
    </section>
  );
}
