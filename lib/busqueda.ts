import { articulos } from "@/lib/articulos";
import { productos } from "@/lib/productos";
import { categorias } from "@/lib/categorias";

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
    titulo: "Productos",
    descripcion: "Lentes de contacto, gafas de sol, monturas, gotas y soluciones.",
    href: "/productos",
  },
];

// Todo el índice se arma una sola vez a partir de tus datos reales.
// Las categorías con productos cargados aparecen automáticamente —
// una categoría nueva sin productos todavía no ensucia el buscador.
const indice: ResultadoBusqueda[] = [
  ...paginasFijas,
  ...categorias
    .filter((c) => productos.some((p) => p.categoria === c.slug))
    .map((c) => ({
      tipo: "Página" as const,
      titulo: c.nombre,
      descripcion: c.descripcion,
      href: `/productos/${c.slug}`,
    })),
  ...articulos.map((a) => ({
    tipo: "Blog" as const,
    titulo: a.titulo,
    descripcion: a.descripcion,
    href: `/blog/${a.slug}`,
  })),
  ...productos.map((p) => ({
    tipo: "Producto" as const,
    titulo: p.titulo,
    descripcion: [p.laboratorio, p.afeccion, [p.uso, p.reemplazo].filter(Boolean).join(", ")]
      .filter(Boolean)
      .join(" · "),
    href: `/productos/${p.categoria}/${p.slug}`,
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
