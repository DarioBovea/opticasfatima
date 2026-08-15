import { ImageResponse } from "next/og";
import { obtenerArticulo } from "@/lib/articulos";

export const runtime = "edge";
export const alt = "Ópticas Fátima — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const articulo = obtenerArticulo(params.slug);
  const titulo = articulo?.titulo ?? "Ópticas Fátima";
  const categoria = articulo?.categoria ?? "Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#F7FAFC",
          padding: "80px",
        }}
      >
        <span style={{ color: "#45deff", fontSize: 26, fontWeight: 700, letterSpacing: 2 }}>
          {categoria.toUpperCase()}
        </span>
        <span
          style={{
            color: "#0d3857",
            fontSize: 58,
            fontWeight: 800,
            marginTop: 20,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          {titulo}
        </span>
        <div style={{ display: "flex", alignItems: "center", marginTop: 48 }}>
          <div style={{ width: 40, height: 4, backgroundColor: "#0d3857", display: "flex" }} />
          <span style={{ color: "#0d3857", fontSize: 28, fontWeight: 700, marginLeft: 16 }}>
            Ópticas Fátima
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
