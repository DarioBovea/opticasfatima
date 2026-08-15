import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { articulos } from "@/lib/articulos";
import { productos } from "@/lib/productos";

// Next.js genera un solo /sitemap.xml con todo. Tu sitio original tenía
// varios sitemaps separados (sitemap.xml, blog-sitemap.xml,
// store-products-sitemap.xml) — con este tamaño de sitio no hace falta
// separarlos; si el catálogo crece mucho más adelante, Next.js soporta
// generar varios sitemaps con `generateSitemaps()`.
export default function sitemap(): MetadataRoute.Sitemap {
  const paginasFijas: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/servicios`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contactenos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/registro`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/bono-regalo`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/productos/lentesdecontacto`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const paginasBlog: MetadataRoute.Sitemap = articulos.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const paginasProductos: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${SITE_URL}/productos/lentesdecontacto/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...paginasFijas, ...paginasBlog, ...paginasProductos];
}
