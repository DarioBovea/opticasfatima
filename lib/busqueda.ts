import { articulos } from "@/lib/articulos";
import { productos } from "@/lib/productos";

export type ResultadoBusqueda = {
  tipo: "Página" | "Blog" | "Producto";
  titulo: string;
  descripcion: string;
  href: string;
};

// Páginas fijas del sitio que queremos que aparezcan en la búsqueda.
const paginasFijas: ResultadoBusqueda[] = [
  { tipo: "Página", titulo: "Inicio", descripcion: "Ópticas Fátima", href: "/" },
  {
    tipo: "Página",
    titulo: "Sobre Nosotros",
    descripcion: "Conoce nuestra historia y compromiso con la salud visual.",
    href: "/nosotros",
  },
  {
    tipo: "Página",
    titulo: "Nuestros Servicios",
    descripcion: "Consulta optométrica, lentes formulados, gafas de sol y más.",
    href: "/servicios",
  },
  {
    tipo: "Página",
    titulo: "Contáctenos",
    descripcion: "Ubicación, horarios y datos de contacto.",
    href: "/contactenos",
  },
  {
    tipo: "Página",
    titulo: "Bono Regalo",
    descripcion: "Recibe un bono de $50.000 para tu primera compra.",
    href: "/bono-regalo",
  },
  {
    tipo: "Página",
    titulo: "Lentes de Contacto",
    descripcion: "Catálogo completo con filtros por marca y defecto visual.",
    href: "/productos/lentesdecontacto",
  },
];

// Todo el índice se arma una sola vez a partir de tus datos reales —
// si agregas un artículo o producto nuevo, aparece solo en la búsqueda.
const indice: ResultadoBusqueda[] = [
  ...paginasFijas,
  ...articulos.map((a) => ({
    tipo: "Blog" as const,
    titulo: a.titulo,
    descripcion: a.descripcion,
    href: `/blog/${a.slug}`,
  })),
  ...productos.map((p) => ({
    tipo: "Producto" as const,
    titulo: p.titulo,
    descripcion: `${p.laboratorio} · ${p.afeccion} · ${p.uso}, ${p.reemplazo}`,
    href: `/productos/lentesdecontacto/${p.slug}`,
  })),
];

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // quita tildes para que "optometrica" también encuentre "optométrica"
}

export function buscar(consulta: string, limite?: number): ResultadoBusqueda[] {
  const q = normalizar(consulta.trim());
  if (!q) return [];

  const resultados = indice.filter(
    (item) => normalizar(item.titulo).includes(q) || normalizar(item.descripcion).includes(q)
  );

  return limite ? resultados.slice(0, limite) : resultados;
}
