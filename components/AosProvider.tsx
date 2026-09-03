"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosProvider() {
  const pathname = usePathname();

  // Se inicializa una sola vez, con una duración/curva pareja en todo
  // el sitio para que se sienta como un solo diseño, no animaciones
  // sueltas por sección.
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true, // se anima solo la primera vez que aparece, no cada vez que subes y bajas
      offset: 80,
    });
  }, []);

  // Next.js navega entre páginas sin recargar — sin esto, AOS no se
  // entera de los elementos nuevos que aparecen en la página siguiente.
  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
