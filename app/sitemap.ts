import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { articulos } from "@/lib/articulos";
import { productos } from "@/lib/productos";
import { categorias } from "@/lib/categorias";

// Si el catálogo crece mucho más adelante, Next.js soporta
// generar varios sitemaps con `generateSitemaps()`.
export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFijas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/servicios`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contactenos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/bono-regalo`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/productos`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/terminos-y-condiciones`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/politica-de-privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Solo se listan las categorías que ya tienen productos cargados —
  // no tiene sentido que Google indexe una categoría vacía.
  const paginasCategorias: MetadataRoute.Sitemap = categorias
    .filter((c) => productos.some((p) => p.categoria === c.slug))
    .map((c) => ({
      url: `${SITE_URL}/productos/${c.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const paginasBlog: MetadataRoute.Sitemap = articulos.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const paginasProductos: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${SITE_URL}/productos/${p.categoria}/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...paginasFijas, ...paginasCategorias, ...paginasBlog, ...paginasProductos];
}
