import { ImageResponse } from "next/og";
import { obtenerProducto } from "@/lib/productos";
import { obtenerCategoria } from "@/lib/categorias";
import { SITE_URL } from "@/lib/seo";

export const alt = "Ópticas Fátima — Producto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ categoria: string; slug: string }> }) {
  const { categoria: categoriaSlug, slug } = await params;
  const producto = obtenerProducto(slug);
  const categoria = obtenerCategoria(categoriaSlug);
  const titulo = producto?.titulo ?? "Ópticas Fátima";
  const precio = producto ? `$${producto.precio.toLocaleString("es-CO")}` : "";
  const etiqueta = categoria ? `${categoria.nombre.toUpperCase()}${producto ? " " + producto.laboratorio.toUpperCase() : ""}` : "ÓPTICAS FÁTIMA";
  // Los productos reales usan una ruta local ("/img/..."), pero los de
  // prueba usan una URL externa completa (placehold.co) — si ya
  // empieza con "http", no le anteponemos el dominio del sitio.
  const urlImagen = producto?.imagen.startsWith("http")
    ? producto.imagen
    : `${SITE_URL}${producto?.imagen ?? ""}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0d3857",
        }}
      >
        <div
          style={{
            width: "45%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {producto && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={urlImagen}
              alt={producto.alt}
              style={{ width: "80%", objectFit: "contain" }}
            />
          )}
        </div>
        <div
          style={{
            width: "55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px",
          }}
        >
          <span style={{ color: "#45deff", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
            {etiqueta}
          </span>
          <span
            style={{
              color: "white",
              fontSize: 46,
              fontWeight: 800,
              marginTop: 16,
              lineHeight: 1.2,
            }}
          >
            {titulo}
          </span>
          <span style={{ color: "#45deff", fontSize: 40, fontWeight: 800, marginTop: 24 }}>
            {precio}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
