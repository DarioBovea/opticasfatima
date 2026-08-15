export type Producto = {
  id: string;
  laboratorio: string;
  slug: string;
  alt: string;
  titulo: string;
  imagen: string;
  precio: number;
  uso: string;
  reemplazo: string;
  contenido: string;
  afeccion: string;
  material: string;
  contenidoAgua: string;
  descripcion: string[];
};

// ✅ Ficha técnica (material y % de agua) verificada con fuentes públicas
// del fabricante y distribuidores oficiales de Acuvue (agosto 2026):
// - id, laboratorio, titulo, imagen, precio, uso, reemplazo, contenido →
//   tomados de tu js/productos.json / tus páginas de producto reales.
// - material y contenidoAgua → verificados: Oasys = Senofilcon A / 38%,
//   Vita = Senofilcon C / 41%, 1-Day Moist y Acuvue 2 = Etafilcon A / 58%.
// - afeccion y descripcion[] → siguen siendo redactadas por mí a partir
//   de lo que vende cada línea de producto (no son texto copiado de
//   ninguna página), pero no están verificadas palabra por palabra con
//   una ficha técnica oficial en español — revísalas si te importa la
//   redacción exacta.
// Nota aparte: noté que tus 8 páginas de producto reales (Productos_acuvue.zip)
// tienen el precio y la ficha técnica idénticos entre sí (copiados del
// molde de Oasys) — probablemente quedaron sin personalizar. Aquí quedaron
// corregidos con los precios de tu productos.json (que sí varían) y los
// datos técnicos reales de cada línea.
export const productos: Producto[] = [
  {
    id: "Acuvue001",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-oasys-hydraclear-plus",
    alt: "Acuvue Oasys con HydraClear Plus",
    titulo: "ACUVUE® Oasys con HydraClear Plus",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_1.webp",
    precio: 238900,
    uso: "Uso diario",
    reemplazo: "Reemplazo quincenal",
    contenido: "Caja con 6 unidades",
    afeccion: "Miopía / Hipermetropía",
    material: "Hidrogel de silicona (Senofilcon A)",
    contenidoAgua: "38%",
    descripcion: [
      "Lentes de contacto Acuvue Oasys con HydraClear Plus",
      "Tienen filtro UV para protección de los rayos del sol",
      "Marca Acuvue de Johnson & Johnson",
      "Ideales para corregir tu visión",
      "Sentirás la libertad y comodidad que buscas",
    ],
  },
  {
    id: "Acuvue002",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-oasys-astigmatismo",
    alt: "Acuvue Oasys para Astigmatismo con HydraClear Plus",
    titulo: "ACUVUE® Oasys para Astigmatismo con HydraClear Plus",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_astig.webp",
    precio: 296900,
    uso: "Uso diario",
    reemplazo: "Reemplazo quincenal",
    contenido: "Caja con 6 unidades",
    afeccion: "Astigmatismo",
    material: "Hidrogel de silicona (Senofilcon A)",
    contenidoAgua: "38%",
    descripcion: [
      "Lentes de contacto Acuvue Oasys para Astigmatismo con HydraClear Plus",
      "Tienen filtro UV para protección de los rayos del sol",
      "Marca Acuvue de Johnson & Johnson",
      "Ideales para corregir tu visión",
      "Sentirás la libertad y comodidad que buscas",
    ],
  },
  {
    id: "Acuvue003",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-oasys-multifocal",
    alt: "Acuvue Oasys Multifocal",
    titulo: "ACUVUE® Oasys Multifocal",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_multi.webp",
    precio: 284900,
    uso: "Uso diario",
    reemplazo: "Reemplazo quincenal",
    contenido: "Caja con 6 unidades",
    afeccion: "Presbicia",
    material: "Hidrogel de silicona (Senofilcon A)",
    contenidoAgua: "38%",
    descripcion: [
      "Lentes de contacto Acuvue Oasys Multifocal",
      "Tienen filtro UV para protección de los rayos del sol",
      "Marca Acuvue de Johnson & Johnson",
      "Ideales para corregir tu visión a varias distancias",
      "Sentirás la libertad y comodidad que buscas",
    ],
  },
  {
    id: "Acuvue004",
    laboratorio: "Johnson & Johnson",
    slug: "1-day-acuvue-moist-lacreon",
    alt: "1-Day ACUVUE Moist con LACREON",
    titulo: "1-Day ACUVUE® Moist con LACREON™",
    imagen: "/img/catalogo/acuvue/acuvue_1day_moist.webp",
    precio: 202900,
    uso: "Uso único",
    reemplazo: "Reemplazo diario",
    contenido: "Caja con 30 unidades",
    afeccion: "Miopía / Hipermetropía",
    material: "Etafilcon A",
    contenidoAgua: "58%",
    descripcion: [
      "Lentes de contacto desechables diarios 1-Day Acuvue Moist",
      "Tecnología LACREON para máxima hidratación todo el día",
      "Marca Acuvue de Johnson & Johnson",
      "No requieren limpieza: usas y desechas",
      "Ideales para uso ocasional o deportivo",
    ],
  },
  {
    id: "Acuvue005",
    laboratorio: "Johnson & Johnson",
    slug: "1-day-acuvue-moist-astigmatismo",
    alt: "1-Day ACUVUE Moist para Astigmatismo con LACREON",
    titulo: "1-Day ACUVUE® Moist para Astigmatismo con LACREON™",
    imagen: "/img/catalogo/acuvue/acuvue_1day_moist_astig.webp",
    precio: 245900,
    uso: "Uso único",
    reemplazo: "Reemplazo diario",
    contenido: "Caja con 30 unidades",
    afeccion: "Astigmatismo",
    material: "Etafilcon A",
    contenidoAgua: "58%",
    descripcion: [
      "Lentes de contacto desechables diarios para astigmatismo",
      "Tecnología LACREON para máxima hidratación todo el día",
      "Marca Acuvue de Johnson & Johnson",
      "No requieren limpieza: usas y desechas",
      "Diseño de estabilización ACCELERATED STABILIZATION DESIGN",
    ],
  },
  {
    id: "Acuvue006",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-vita",
    alt: "Acuvue Vita",
    titulo: "ACUVUE® Vita™",
    imagen: "/img/catalogo/acuvue/acuvue_vita.webp",
    precio: 291900,
    uso: "Uso diario",
    reemplazo: "Reemplazo mensual",
    contenido: "Caja con 6 unidades",
    afeccion: "Miopía / Hipermetropía",
    material: "Senofilcon C",
    contenidoAgua: "41%",
    descripcion: [
      "Lentes de contacto de reemplazo mensual Acuvue Vita",
      "Tecnología HydraMax para mantener la hidratación durante todo el mes",
      "Marca Acuvue de Johnson & Johnson",
      "Alta transmisibilidad de oxígeno para ojos más sanos",
      "Comodidad de principio a fin del ciclo de uso",
    ],
  },
  {
    id: "Acuvue007",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-vita-astigmatismo",
    alt: "Acuvue Vita para Astigmatismo",
    titulo: "ACUVUE® Vita™ para Astigmatismo",
    imagen: "/img/catalogo/acuvue/acuvue_vita_astig.webp",
    precio: 308900,
    uso: "Uso diario",
    reemplazo: "Reemplazo mensual",
    contenido: "Caja con 6 unidades",
    afeccion: "Astigmatismo",
    material: "Senofilcon C",
    contenidoAgua: "41%",
    descripcion: [
      "Lentes de contacto de reemplazo mensual para astigmatismo",
      "Diseñados para mantener la hidratación durante todo el mes",
      "Marca Acuvue de Johnson & Johnson",
      "Alta transmisibilidad de oxígeno para ojos más sanos",
      "Estabilidad visual constante en cada parpadeo",
    ],
  },
  {
    id: "Acuvue008",
    laboratorio: "Johnson & Johnson",
    slug: "acuvue-2",
    alt: "Acuvue 2",
    titulo: "ACUVUE® 2",
    imagen: "/img/catalogo/acuvue/acuvue_2.webp",
    precio: 221900,
    uso: "Uso diario",
    reemplazo: "Reemplazo quincenal",
    contenido: "Caja con 6 unidades",
    afeccion: "Miopía / Hipermetropía",
    material: "Etafilcon A",
    contenidoAgua: "58%",
    descripcion: [
      "Lentes de contacto Acuvue 2 de reemplazo quincenal",
      "Comodidad confiable a un precio accesible",
      "Marca Acuvue de Johnson & Johnson",
      "Ideales para corregir tu visión",
      "Fáciles de manipular, ideales para primerizos",
    ],
  },
];

export function obtenerProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}

export function obtenerProductoPorId(id: string) {
  return productos.find((p) => p.id === id);
}
