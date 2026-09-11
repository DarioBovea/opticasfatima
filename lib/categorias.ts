// Catálogo de categorías de producto. Agregar una categoría nueva a
// este arreglo es lo único que hace falta para que aparezca en
// /productos, en el menú, y para que sus productos usen el
// formulario correcto (con o sin fórmula RX).
export type CategoriaSlug =
  | "lentesdecontacto"
  | "gafasdesol"
  | "monturas"
  | "gotas"
  | "soluciones";

export type Categoria = {
  slug: CategoriaSlug;
  nombre: string; // "Lentes de Contacto" — para títulos y menús
  nombreSingular: string; // "lente de contacto" — para textos en prosa
  descripcion: string;
  // true = el producto necesita el formulario de fórmula (esfera,
  // cilindro, eje, adición); false = solo cantidad y "Agregar al carrito"
  tieneFormula: boolean;
};

export const categorias: Categoria[] = [
  {
    slug: "lentesdecontacto",
    nombre: "Lentes de Contacto",
    nombreSingular: "lente de contacto",
    descripcion: "Filtra por marca, defecto visual y tipo de reemplazo.",
    tieneFormula: true,
  },
  {
    slug: "gafasdesol",
    nombre: "Gafas de Sol",
    nombreSingular: "gafas de sol",
    descripcion: "Protección UV con el estilo que buscas.",
    tieneFormula: false,
  },
  {
    slug: "monturas",
    nombre: "Monturas",
    nombreSingular: "montura",
    descripcion: "Monturas oftálmicas para todos los estilos.",
    tieneFormula: false,
  },
  {
    slug: "gotas",
    nombre: "Gotas",
    nombreSingular: "gota",
    descripcion: "Gotas humectantes y de cuidado visual.",
    tieneFormula: false,
  },
  {
    slug: "soluciones",
    nombre: "Soluciones",
    nombreSingular: "solución",
    descripcion: "Soluciones de limpieza y mantenimiento para lentes de contacto.",
    tieneFormula: false,
  },
];

export function obtenerCategoria(slug: string) {
  return categorias.find((c) => c.slug === slug);
}
