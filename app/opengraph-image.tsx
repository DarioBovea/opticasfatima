import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ópticas Fátima";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d3857",
          position: "relative",
        }}
      >
        {/* Anillo decorativo, evoca una lente */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: "50%",
            transform: "translateY(-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: "50%",
            transform: "translateY(-50%)",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "3px solid #45deff",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            paddingLeft: 80,
            width: "100%",
          }}
        >
          <span style={{ color: "#45deff", fontSize: 28, fontWeight: 600, letterSpacing: 2 }}>
            CORDIAL BIENVENIDA A
          </span>
          <span style={{ color: "white", fontSize: 72, fontWeight: 800, marginTop: 8 }}>
            Ópticas Fátima
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 30, marginTop: 16 }}>
            La confianza que se ve, la calidad que se nota.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
