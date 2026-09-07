import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosProvider from "@/components/AosProvider";
import { CartProvider } from "@/context/CartContext";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    // Las páginas hijas ponen su propio título y queda "Su título | Ópticas Fátima"
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Verificación de Google Search Console. Solo aparece en el HTML si
  // configuras la variable de entorno — mientras tanto, no hace nada.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Se ejecuta ANTES de que React pinte nada, directo en el <head> —
// si no hiciéramos esto, la página siempre cargaría en claro por una
// fracción de segundo y luego "saltaría" a oscuro, algo muy notorio.
const scriptTema = `
  (function () {
    try {
      var guardado = localStorage.getItem("opticas-tema");
      var prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var oscuro = guardado ? guardado === "dark" : prefiereOscuro;
      document.documentElement.classList.toggle("dark", oscuro);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>
        <AosProvider />
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
        {/* Google Analytics — solo se carga si configuraste NEXT_PUBLIC_GA_ID */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
