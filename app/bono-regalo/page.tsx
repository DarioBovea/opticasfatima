import PaginaSimple from "@/components/PaginaSimple";
import FormularioBono from "@/components/FormularioBono";
import TarjetaBono from "@/components/TarjetaBono";

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

        <TarjetaBono mostrarEnlace={false} className="my-8 w-[90%]" />

        <FormularioBono />
    </PaginaSimple>
  );
}
