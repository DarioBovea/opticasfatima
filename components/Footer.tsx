import { MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";

const redes = [
  { href: "https://wa.me/573043446574", label: "WhatsApp", Icon: MessageCircle },
  { href: "https://www.facebook.com/opticasfatima", label: "Facebook", Icon: Facebook },
  { href: "https://www.instagram.com/opticasfatima/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/in/opticasfatima/", label: "LinkedIn", Icon: Linkedin },
];

export default function Footer() {
  return (
    // El original usa img/background-footer.svg como fondo decorativo.
    // Cópialo a public/img/background-footer.svg y descomenta el estilo
    // de abajo si quieres el patrón exacto; por ahora uso el azul sólido.
    <footer className="w-full bg-primary pt-[70px] text-white min-[1920px]:pt-[120px]">
      <div className="mx-auto flex w-4/5 flex-col items-center gap-10 py-6 md:flex-row">
        <div className="w-full text-center md:w-1/3 max-[768px]:mt-6" data-aos="fade-up">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logotipos/logoblanco.png"
            alt="Logo Ópticas Fátima"
            className="mx-auto w-[70%]"
          />
        </div>

        <div className="w-full text-center md:w-1/3" data-aos="fade-up" data-aos-delay="100">
          <span className="text-2xl font-bold">Comuníquese con nosotros:</span>
          <div className="my-4 text-lg font-bold">
            <p>De lunes a viernes,</p>
            <p>7:00 am a 6:00 pm</p>
            <p>Sábados,</p>
            <p>8:00 am a 12:00 pm</p>
          </div>
          <p className="mb-1">Carrera 18 # 19B - 06 </p>
          <p>Consultorio 2</p>
          <p>320 578 71 43 — 304 344 65 74</p>
        </div>

        <div className="w-full text-center md:w-1/3" data-aos="fade-up" data-aos-delay="200">
          <span className="text-2xl font-bold">Síguenos en nuestras redes sociales</span>
          <div className="mt-4 flex justify-center gap-4">
            {redes.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Nuestro ${label}`}
                className="transition hover:text-light"
              >
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-[97%] border-t border-white/40" />
      <div className="flex flex-col items-center gap-2 py-3 text-center text-sm">
        <div className="flex gap-4 text-xs">
          <a href="/terminos-y-condiciones" className="underline hover:text-light">
            Términos y Condiciones
          </a>
          <a href="/politica-de-privacidad" className="underline hover:text-light">
            Política de Privacidad
          </a>
        </div>
        <span>Ópticas Fátima 2026 - 2027. © Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
