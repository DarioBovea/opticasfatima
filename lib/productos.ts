import type { CategoriaSlug } from "@/lib/categorias";

export type Producto = {
  id: string;
  categoria: CategoriaSlug;
  laboratorio: string;
  slug: string;
  alt: string;
  titulo: string;
  imagen: string;
  galeria?: string[];
  precio: number;
  descripcion: string[];
  tipoFormula?: "esferico" | "torico" | "multifocal";
  uso?: string;
  reemplazo?: string;
  contenido?: string;
  afeccion?: string;
  material?: string;
  contenidoAgua?: string;

  // Para categorías SIN fórmula (gafas de sol, monturas, gotas,
  // soluciones): pares clave/valor genéricos para la ficha técnica.
  // Ej: [{ etiqueta: "Material", valor: "Acetato" }]
  atributos?: { etiqueta: string; valor: string }[];
};

export const productos: Producto[] = [
  {
    id: "Acuvue001",
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "esferico",
    slug: "acuvue-oasys-hydraclear-plus",
    alt: "Acuvue Oasys con HydraClear Plus",
    titulo: "ACUVUE® Oasys con HydraClear Plus",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_1.webp",
    precio: 343400,
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
    galeria: [
      "/img/catalogo/Miraflex/MF1042_M572_Side_1.avif",
      "/img/catalogo/Miraflex/MF1042_M572_Side_2.avif",
    ],
  },
  {
    id: "Acuvue002",
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "torico",
    slug: "acuvue-oasys-astigmatismo",
    alt: "Acuvue Oasys para Astigmatismo con HydraClear Plus",
    titulo: "ACUVUE® Oasys para Astigmatismo con HydraClear Plus",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_astig.webp",
    precio: 420300,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "multifocal",
    slug: "acuvue-oasys-multifocal",
    alt: "Acuvue Oasys Multifocal",
    titulo: "ACUVUE® Oasys Multifocal",
    imagen: "/img/catalogo/acuvue/acuvue_oasys_multi.webp",
    precio: 350200,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "esferico",
    slug: "1-day-acuvue-moist-lacreon",
    alt: "1-Day ACUVUE Moist con LACREON",
    titulo: "1-Day ACUVUE® Moist con LACREON™",
    imagen: "/img/catalogo/acuvue/acuvue_1day_moist.webp",
    precio: 256800,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "torico",
    slug: "1-day-acuvue-moist-astigmatismo",
    alt: "1-Day ACUVUE Moist para Astigmatismo con LACREON",
    titulo: "1-Day ACUVUE® Moist para Astigmatismo con LACREON™",
    imagen: "/img/catalogo/acuvue/acuvue_1day_moist_astig.webp",
    precio: 304600,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "esferico",
    slug: "acuvue-vita",
    alt: "Acuvue Vita",
    titulo: "ACUVUE® Vita™",
    imagen: "/img/catalogo/acuvue/acuvue_vita.webp",
    precio: 355600,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "torico",
    slug: "acuvue-vita-astigmatismo",
    alt: "Acuvue Vita para Astigmatismo",
    titulo: "ACUVUE® Vita™ para Astigmatismo",
    imagen: "/img/catalogo/acuvue/acuvue_vita_astig.webp",
    precio: 323200,
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
    categoria: "lentesdecontacto",
    laboratorio: "Johnson & Johnson",
    tipoFormula: "esferico",
    slug: "acuvue-2",
    alt: "Acuvue 2",
    titulo: "ACUVUE® 2",
    imagen: "/img/catalogo/acuvue/acuvue_2.webp",
    precio: 266000,
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
  //----------------------------------------------------------------
  // --- Gafas de sol (sin fórmula) --------------------------------
  //----------------------------------------------------------------
  {
    id: "MF1042_M572",
    categoria: "gafasdesol",
    laboratorio: "Miraflex",
    slug: "MF1042_M572",
    alt: "Gafas de sol Miraflex Kids",
    titulo: "Gafas de sol Miraflex Kids",
    imagen: "/img/catalogo/Miraflex/MF1042_M572_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF1042_M572_Side_1.avif",
      "/img/catalogo/Miraflex/MF1042_M572_Side_2.avif",
    ],
    precio: 330000,
    atributos: [
      { etiqueta: "Protección UV", valor: "UV400" },
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Color", valor: "Negro / Dorado" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },

  {
    id: "DEMO-GS-002",
    categoria: "gafasdesol",
    laboratorio: "Oakley",
    slug: "demo-oakley-holbrook",
    alt: "Gafas de sol Oakley Holbrook",
    titulo: "Oakley Holbrook (producto de prueba)",
    imagen: "https://placehold.co/400x400/0d3857/FFFFFF?text=Holbrook",
    precio: 380000,
    atributos: [
      { etiqueta: "Protección UV", valor: "UV400" },
      { etiqueta: "Material", valor: "O Matter (plástico liviano)" },
      { etiqueta: "Color", valor: "Negro mate" },
    ],
    descripcion: [
      "Producto de ejemplo — reemplazar con datos reales antes de publicar",
      "Diseño deportivo inspirado en los clásicos años 40",
      "Lentes con protección UV400",
    ],
  },

  //----------------------------------------------------------------
  // --- Monturas (sin fórmula) ------------------------------------
  //----------------------------------------------------------------

  {
    id: "MF4001_K593",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4001_K593",
    alt: "Miraflex MF4001 K593",
    titulo: "Miraflex MF4001 K593",
    imagen: "/img/catalogo/Miraflex/MF4001_K593_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4001_K593_Side_1.avif",
      "/img/catalogo/Miraflex/MF4001_K593_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Verde / Negro" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4001_K598",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4001_K598",
    alt: "Miraflex MF4001 K598",
    titulo: "Miraflex MF4001 K598",
    imagen: "/img/catalogo/Miraflex/MF4001_K598_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4001_K598_Side_1.avif",
      "/img/catalogo/Miraflex/MF4001_K598_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Transparente / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4001_K602",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4001_K602",
    alt: "Miraflex MF4001 K602",
    titulo: "Miraflex MF4001 K602",
    imagen: "/img/catalogo/Miraflex/MF4001_K602_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4001_K602_Side_1.avif",
      "/img/catalogo/Miraflex/MF4001_K602_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Verde / Negro" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4002_k613",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4002_K613",
    alt: "Miraflex MF4002 K613",
    titulo: "Miraflex MF4002 K613",
    imagen: "/img/catalogo/Miraflex/MF4002_K613_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4002_K613_Side_1.avif",
      "/img/catalogo/Miraflex/MF4002_K613_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Transparente / Rosada" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4002_L122",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4002_L122",
    alt: "Miraflex MF4002 L122",
    titulo: "Miraflex MF4002 L122",
    imagen: "/img/catalogo/Miraflex/MF4002_L122_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4002_L122_Side_1.avif",
      "/img/catalogo/Miraflex/MF4002_L122_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Transparente / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4002_K606",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4002_K606",
    alt: "Miraflex MF4002 K606",
    titulo: "Miraflex MF4002 K606",
    imagen: "/img/catalogo/Miraflex/MF4002_K606_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4002_K606_Side_1.avif",
      "/img/catalogo/Miraflex/MF4002_K606_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Rosada translucida" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4002_K608",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4002_K608",
    alt: "Miraflex MF4002 K608",
    titulo: "Miraflex MF4002 K608",
    imagen: "/img/catalogo/Miraflex/MF4002_K608_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4002_K608_Side_1.avif",
      "/img/catalogo/Miraflex/MF4002_K608_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Gris translucido / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4002_K610",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4002_K610",
    alt: "Miraflex MF4002 K610",
    titulo: "Miraflex MF4002 K610",
    imagen: "/img/catalogo/Miraflex/MF4002_K610_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4002_K610_Side_1.avif",
      "/img/catalogo/Miraflex/MF4002_K610_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Azul translucido" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4007_L134",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4007_L134",
    alt: "Miraflex MF4007 L134",
    titulo: "Miraflex MF4007 L134",
    imagen: "/img/catalogo/Miraflex/MF4007_L134_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4007_L134_Side_1.avif",
      "/img/catalogo/Miraflex/MF4007_L134_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Azul translucido / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4007_L137",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4007_L137",
    alt: "Miraflex MF4007 L137",
    titulo: "Miraflex MF4007 L137",
    imagen: "/img/catalogo/Miraflex/MF4007_L137_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4007_L137_Side_1.avif",//imagen repetida
      "/img/catalogo/Miraflex/MF4007_L137_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Transparente / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4007_L141",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4007_L141",
    alt: "Miraflex MF4007 L141",
    titulo: "Miraflex MF4007 L141",
    imagen: "/img/catalogo/Miraflex/MF4007_L141_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4007_L141_Side_1.avif",
      "/img/catalogo/Miraflex/MF4007_L141_Side_2.avif",
    ],
    precio: 240000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Transparente / Azul" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4010_L892",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4010_L892",
    alt: "Miraflex MF4010 L892",
    titulo: "Miraflex MF4010 L892",
    imagen: "/img/catalogo/Miraflex/MF4010_L892_Front.webp",
    galeria: [
      "/img/catalogo/Miraflex/MF4010_L892_Side_1.webp",
      "/img/catalogo/Miraflex/MF4010_L892_Side_2.webp",
    ],
    precio: 300000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Ovalada" },
      { etiqueta: "Color", valor: "Morado / Lila" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4010_L358",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4010_L358",
    alt: "Miraflex MF4010 L358",
    titulo: "Miraflex MF4010 L358",
    imagen: "/img/catalogo/Miraflex/MF4010_L358_Front.webp",
    galeria: [
      "/img/catalogo/Miraflex/MF4010_L358_Side_1.webp",
      "/img/catalogo/Miraflex/MF4010_L358_Side_2.webp",
    ],
    precio: 300000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Ovalada" },
      { etiqueta: "Color", valor: "Rosada translucida" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4012_L365",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4012_L365",
    alt: "Miraflex MF4012 L365",
    titulo: "Miraflex MF4012 L365",
    imagen: "/img/catalogo/Miraflex/MF4012_L365_Front.webp",
    galeria: [
      "/img/catalogo/Miraflex/MF4012_L365_Side_1.webp",
      "/img/catalogo/Miraflex/MF4012_L365_Side_2.webp",
    ],
    precio: 300000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Verde / Gris" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4012_L366",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4012_L366",
    alt: "Miraflex MF4012 L366",
    titulo: "Miraflex MF4012 L366",
    imagen: "/img/catalogo/Miraflex/MF4012_L366_Front.avif",
    galeria: [
      "/img/catalogo/Miraflex/MF4012_L366_Side_1.avif",
      "/img/catalogo/Miraflex/MF4012_L366_Side_2.avif",
    ],
    precio: 300000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Azul / Gris" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },
  {
    id: "MF4012_L368",
    categoria: "monturas",
    laboratorio: "Miraflex",
    slug: "MF4012_L368",
    alt: "Miraflex MF4012 L368",
    titulo: "Miraflex MF4012 L368",
    imagen: "/img/catalogo/Miraflex/MF4012_L368_Front.webp",
    galeria: [
      "/img/catalogo/Miraflex/MF4012_L368_Side_1.webp",
      "/img/catalogo/Miraflex/MF4012_L368_Side_2.webp",
    ],
    precio: 300000,
    atributos: [
      { etiqueta: "Material", valor: "Plastico Inyectado" },
      { etiqueta: "Forma", valor: "Rectangular" },
      { etiqueta: "Color", valor: "Azul / Gris" },
    ],
    descripcion: [
      "Gafas de sol para niños(as)",
      "Plastico inyectado",
      "Es liviano y resistente",
    ],
  },

  // --- Gotas (sin fórmula) ---
  {
    id: "DEMO-GT-001",
    categoria: "gotas",
    laboratorio: "Alcon",
    slug: "demo-systane-ultra",
    alt: "Gotas humectantes Systane Ultra",
    titulo: "Systane Ultra (producto de prueba)",
    imagen: "https://placehold.co/400x400/45deff/0d3857?text=Systane",
    precio: 45000,
    atributos: [
      { etiqueta: "Contenido", valor: "10 ml" },
      { etiqueta: "Tipo", valor: "Lubricante ocular" },
    ],
    descripcion: [
      "Producto de ejemplo — reemplazar con datos reales antes de publicar",
      "Alivio prolongado para el ojo seco",
      "Uso recomendado: consulta a tu optómetra",
    ],
  },
  {
    id: "DEMO-GT-002",
    categoria: "gotas",
    laboratorio: "Allergan",
    slug: "demo-refresh-tears",
    alt: "Gotas humectantes Refresh Tears",
    titulo: "Refresh Tears (producto de prueba)",
    imagen: "https://placehold.co/400x400/45deff/0d3857?text=Refresh",
    precio: 38000,
    atributos: [
      { etiqueta: "Contenido", valor: "15 ml" },
      { etiqueta: "Tipo", valor: "Lubricante ocular" },
    ],
    descripcion: [
      "Producto de ejemplo — reemplazar con datos reales antes de publicar",
      "Fórmula suave para uso frecuente",
      "Uso recomendado: consulta a tu optómetra",
    ],
  },

  // --- Soluciones para lentes de contacto (sin fórmula) ---
  {
    id: "DEMO-SL-001",
    categoria: "soluciones",
    laboratorio: "Bausch + Lomb",
    slug: "demo-renu-multiplus",
    alt: "Solución multipropósito ReNu MultiPlus",
    titulo: "ReNu MultiPlus (producto de prueba)",
    imagen: "https://placehold.co/400x400/45deff/0d3857?text=ReNu",
    precio: 42000,
    atributos: [
      { etiqueta: "Contenido", valor: "355 ml" },
      { etiqueta: "Tipo", valor: "Multipropósito" },
    ],
    descripcion: [
      "Producto de ejemplo — reemplazar con datos reales antes de publicar",
      "Limpia, enjuaga, desinfecta y guarda tus lentes de contacto",
      "Para lentes blandos",
    ],
  },
  {
    id: "DEMO-SL-002",
    categoria: "soluciones",
    laboratorio: "Alcon",
    slug: "demo-optifree-puremoist",
    alt: "Solución multipropósito Opti-Free PureMoist",
    titulo: "Opti-Free PureMoist (producto de prueba)",
    imagen: "https://placehold.co/400x400/45deff/0d3857?text=Opti-Free",
    precio: 48000,
    atributos: [
      { etiqueta: "Contenido", valor: "300 ml" },
      { etiqueta: "Tipo", valor: "Multipropósito" },
    ],
    descripcion: [
      "Producto de ejemplo — reemplazar con datos reales antes de publicar",
      "Hidratación durante todo el día de uso",
      "Para lentes blandos",
    ],
  },
];

export function obtenerProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}

export function obtenerProductosPorCategoria(categoria: string) {
  return productos.filter((p) => p.categoria === categoria);
}

export function obtenerProductoPorId(id: string) {
  return productos.find((p) => p.id === id);
}
