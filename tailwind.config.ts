import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores reales de la marca (tomados de css/style.css)
        primary: "#0d3857",   // azul oscuro
        light: "#45deff",     // azul claro / hover
        canvas: "#FFFFFF",
        line: "#E5E9EC",
        // Superficies para modo oscuro — NO reemplazan a "primary" (que
        // sigue siendo el azul de marca para botones/header/footer),
        // son fondos y bordes nuevos, propios del tema oscuro.
        darksurface: "#0a1a2b",   // fondo de página en modo oscuro
        darkcard: "#102a40",      // tarjetas/cajas en modo oscuro
        darkline: "#1e3a52",      // bordes en modo oscuro
        darktext: "#dbe8f0",      // texto por defecto en modo oscuro
      },
      fontFamily: {
        // Fuente real del sitio original
        sans: ["'Rubik'", "sans-serif"],
      },
      boxShadow: {
        header: "6px 6px 32px rgba(52, 52, 52, .46)",
        btn: "0 8px 10px rgba(13, 56, 87, 0.32)",
      },
    },
  },
  plugins: [],
};
export default config;
