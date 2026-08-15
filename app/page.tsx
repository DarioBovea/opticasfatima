import Hero from "@/components/Hero";
import MensajeBanner from "@/components/MensajeBanner";
import Servicios from "@/components/Servicios";
import Bono from "@/components/Bono";
import Blog from "@/components/Blog";

export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MensajeBanner />
      <Servicios />
      <Bono />
      <Blog />
    </main>
  );
}
