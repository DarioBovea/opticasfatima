export const metadata = {
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio web de Ópticas Fátima, el catálogo de productos y el Bono Regalo.",
  alternates: { canonical: "/terminos-y-condiciones" },
  openGraph: { url: "/terminos-y-condiciones" },
};

export default function TerminosCondicionesPage() {
  return (
    <section className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-3xl text-primary">
        <h1 className="mb-2 text-3xl font-bold text-light md:text-4xl">
          Términos y Condiciones
        </h1>
        <p className="mb-8 text-sm text-primary/60">
          Última actualización: agosto de 2026
        </p>

        <div className="space-y-6 leading-relaxed">
          <p>
            Al usar el sitio web de Ópticas Fátima, usted acepta los siguientes
            términos y condiciones. Le recomendamos leerlos antes de registrar
            sus datos o solicitar un producto.
          </p>

          <h2 className="pt-2 text-xl font-bold">1. Sobre el sitio</h2>
          <p>
            Este sitio funciona como catálogo informativo y canal de contacto
            de Ópticas Fátima. No es una tienda en línea con pago automático:
            las compras se coordinan y finalizan directamente por WhatsApp con
            nuestro equipo.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            2. Precios y disponibilidad
          </h2>
          <p>
            Los precios publicados están en pesos colombianos (COP) e incluyen
            IVA cuando aplique. Pueden cambiar sin previo aviso y no
            constituyen una oferta vinculante hasta que se confirme la compra
            por WhatsApp. La disponibilidad de cada producto está sujeta a
            existencias.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            3. Fórmula óptica y lentes de contacto
          </h2>
          <p>
            Al seleccionar la fórmula (esfera, cilindro, eje) para lentes de
            contacto, usted declara que dicha información proviene de una
            fórmula vigente emitida por un profesional de la salud visual.
            Ópticas Fátima no se hace responsable por el uso de lentes de
            contacto formulados incorrectamente por el cliente. Recomendamos
            realizar una consulta optométrica antes de comprar lentes de
            contacto por primera vez o si su fórmula tiene más de un año.
          </p>

          <h2 className="pt-2 text-xl font-bold">4. Bono Regalo</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              El Bono Regalo de $50.000 aplica una única vez por persona en su
              primera compra.
            </li>
            <li>
              Para activarlo, debe completar el registro y confirmar su código
              por WhatsApp; el bono queda sujeto a verificación por nuestro
              equipo antes de hacerse efectivo.
            </li>
            <li>
              El bono no es acumulable con otras promociones vigentes, no es
              redimible por dinero en efectivo, y aplica sobre el valor de la
              compra antes de impuestos.
            </li>
            <li>
              Ópticas Fátima se reserva el derecho de modificar o finalizar
              esta promoción en cualquier momento.
            </li>
          </ul>

          <h2 className="pt-2 text-xl font-bold">
            5. Uso aceptable del sitio
          </h2>
          <p>
            Al usar los formularios de este sitio, usted se compromete a
            proporcionar información veraz y a no utilizarlos con fines
            fraudulentos, como generar registros o códigos de bono falsos.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            6. Propiedad intelectual
          </h2>
          <p>
            El contenido de este sitio (textos, imágenes, logotipo) es
            propiedad de Ópticas Fátima o de sus respectivos fabricantes
            (como las marcas de lentes de contacto mostradas), y no puede
            reproducirse sin autorización.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            7. Tratamiento de datos personales
          </h2>
          <p>
            El tratamiento de los datos personales que usted nos proporciona
            se rige por nuestra{" "}
            <a href="/politica-de-privacidad" className="underline">
              Política de Privacidad
            </a>
            .
          </p>

          <h2 className="pt-2 text-xl font-bold">8. Contacto</h2>
          <p>
            Para dudas sobre estos términos, escríbanos a{" "}
            <a href="mailto:info@opticasfatima.com" className="underline">
              info@opticasfatima.com
            </a>{" "}
            o visítenos en Carrera 18 # 19B-06, Consultorio 2, Pasto, Nariño.
          </p>

          <p className="pt-4 text-sm text-primary/60">
            Este documento es una guía general y no reemplaza asesoría legal
            profesional. Le recomendamos que un abogado revise estos términos
            antes de operar el sitio de forma definitiva.
          </p>
        </div>
      </div>
    </section>
  );
}
