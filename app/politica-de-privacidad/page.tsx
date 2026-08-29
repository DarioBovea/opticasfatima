export const metadata = {
  title: "Política de Privacidad",
  description:
    "Cómo Ópticas Fátima recolecta, usa y protege tus datos personales, de acuerdo con la Ley 1581 de 2013 de Colombia.",
  alternates: { canonical: "/politica-de-privacidad" },
  openGraph: { url: "/politica-de-privacidad" },
};

export default function PoliticaPrivacidadPage() {
  return (
    <section className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-3xl text-primary">
        <h1 className="mb-2 text-3xl font-bold text-light md:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mb-8 text-sm text-primary/60">
          Última actualización: agosto de 2026
        </p>

        <div className="space-y-6 leading-relaxed">
          <p>
            Ópticas Fátima (en adelante, &ldquo;nosotros&rdquo;), con domicilio en
            Carrera 18 # 19B-06, Consultorio 2, Pasto, Nariño, es responsable
            del tratamiento de los datos personales que usted nos suministra a
            través de este sitio web, de acuerdo con la{" "}
            <strong>Ley 1581 de 2013</strong> y el{" "}
            <strong>Decreto 1377 de 2013</strong> de la República de Colombia
            sobre protección de datos personales (habeas data).
          </p>

          <h2 className="pt-2 text-xl font-bold">1. Datos que recolectamos</h2>
          <p>Según el formulario que utilice, podemos recolectar:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de WhatsApp / teléfono</li>
            <li>Dirección (formulario de registro)</li>
            <li>Fecha de nacimiento (formulario de registro)</li>
            <li>
              Fórmula óptica (esfera, cilindro, eje) que usted mismo ingresa al
              agregar lentes de contacto al carrito
            </li>
          </ul>
          <p>
            No recolectamos datos de tarjetas de crédito ni información
            financiera: el pago se coordina directamente por WhatsApp.
          </p>

          <h2 className="pt-2 text-xl font-bold">2. Finalidad del tratamiento</h2>
          <p>Usamos sus datos personales para:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Gestionar el Bono Regalo y verificar su código de canje</li>
            <li>Contactarlo para coordinar la compra o entrega de productos</li>
            <li>
              Enviarle información y promociones sobre nuestros productos y
              servicios (solo si usted se registró voluntariamente para
              recibirlas)
            </li>
            <li>
              Responder sus consultas realizadas a través de los formularios de
              contacto o WhatsApp
            </li>
          </ul>
          <p>
            No vendemos, alquilamos ni compartimos sus datos personales con
            terceros para fines comerciales ajenos a Ópticas Fátima.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            3. Dónde se almacenan sus datos
          </h2>
          <p>
            Sus datos se almacenan en una base de datos gestionada por{" "}
            <strong>Supabase</strong>, un proveedor de infraestructura en la
            nube, bajo estándares de seguridad de la industria. El acceso a
            esta información está restringido al personal autorizado de
            Ópticas Fátima mediante autenticación con usuario y contraseña.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            4. Sus derechos como titular de los datos
          </h2>
          <p>De acuerdo con la ley colombiana, usted tiene derecho a:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Conocer, actualizar y rectificar sus datos personales</li>
            <li>
              Solicitar prueba de la autorización que nos otorgó, cuando
              aplique
            </li>
            <li>
              Ser informado sobre el uso que le hemos dado a sus datos
              personales
            </li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio
              por infracciones a la ley de protección de datos
            </li>
            <li>
              Revocar la autorización y/o solicitar la supresión de sus datos,
              cuando no exista un deber legal o contractual que lo impida
            </li>
            <li>Acceder de forma gratuita a sus datos personales tratados</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, puede escribirnos a{" "}
            <a href="mailto:info@opticasfatima.com" className="underline">
              info@opticasfatima.com
            </a>{" "}
            o comunicarse por WhatsApp al número que aparece en nuestro pie de
            página. Atenderemos su solicitud dentro de los plazos que
            establece la ley.
          </p>

          <h2 className="pt-2 text-xl font-bold">
            5. Vigencia de la base de datos
          </h2>
          <p>
            Sus datos se conservarán mientras sean necesarios para las
            finalidades descritas, o hasta que usted solicite su supresión, lo
            que ocurra primero.
          </p>

          <h2 className="pt-2 text-xl font-bold">6. Menores de edad</h2>
          <p>
            Contamos con productos dirigidos a niños (gafas para niños), pero
            los formularios de este sitio están dirigidos a los padres,
            madres o acudientes, quienes deben ser mayores de edad para
            registrar sus datos y los de sus hijos.
          </p>

          <h2 className="pt-2 text-xl font-bold">7. Cambios a esta política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad en cualquier
            momento. Los cambios serán publicados en esta misma página, con
            su fecha de actualización correspondiente.
          </p>

          <p className="pt-4 text-sm text-primary/60">
            Este documento es una guía general y no reemplaza asesoría legal
            profesional. Si tiene inquietudes específicas sobre el tratamiento
            de sus datos, le recomendamos consultarlas con un abogado
            especializado en protección de datos.
          </p>
        </div>
      </div>
    </section>
  );
}
