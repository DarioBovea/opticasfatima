import type { Config } from "tailwindcss";

const config: Config = {
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
