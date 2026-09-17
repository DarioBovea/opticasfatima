import { SITE_URL, SITE_NAME } from "@/lib/seo";
import type { Producto } from "@/lib/productos";
import type { Articulo } from "@/lib/articulos";
import type { Categoria } from "@/lib/categorias";

// Datos reales del negocio, tomados de components/Footer.tsx y
// components/Header.tsx — si cambian ahí, actualízalos también aquí.
const NEGOCIO = {
  telefono: "+57 320 578 71 43",
  telefonoAlterno: "+57 304 344 65 74",
  direccion: "Carrera 18 # 19B - 06, Consultorio 2",
  ciudad: "Pasto",
  region: "Nariño",
  pais: "CO",
  whatsapp: "https://wa.me/573043446574",
  facebook: "https://www.facebook.com/opticasfatima",
  instagram: "https://www.instagram.com/opticasfatima/",
  linkedin: "https://www.linkedin.com/in/opticasfatima/",
};


export function generarSchemaNegocio() {
  return {
    "@context": "https://schema.org",
    "@type": "Optician",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logotipos/azul-letras.png`,
    image: `${SITE_URL}/img/logotipos/azul-letras.png`,
    telephone: NEGOCIO.telefono,
    address: {
      "@type": "PostalAddress",
      streetAddress: NEGOCIO.direccion,
      addressLocality: NEGOCIO.ciudad,
      addressRegion: NEGOCIO.region,
      addressCountry: NEGOCIO.pais,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "12:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "17:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: [NEGOCIO.whatsapp, NEGOCIO.facebook, NEGOCIO.instagram, NEGOCIO.linkedin],
  };
}


export function generarSchemaProducto(producto: Producto, categoria: Categoria) {

  const urlImagen = producto.imagen.startsWith("http")
    ? producto.imagen
    : `${SITE_URL}${producto.imagen}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.titulo,
    image: urlImagen,
    description: producto.descripcion.join(" "),
    brand: {
      "@type": "Brand",
      name: producto.laboratorio,
    },
    category: categoria.nombre,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/productos/${producto.categoria}/${producto.slug}`,
      priceCurrency: "COP",
      price: producto.precio,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Optician",
        name: SITE_NAME,
      },
    },
  };
}

// Un artículo del blog.
export function generarSchemaArticulo(articulo: Articulo) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: articulo.titulo,
    description: articulo.descripcion,
    image: `${SITE_URL}${articulo.imagen}`,
    url: `${SITE_URL}/blog/${articulo.slug}`,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/logotipos/azul-letras.png`,
      },
    },
  };
}

// Migas de pan — ayuda a Google a entender la jerarquía de una página
// (ej. Inicio > Productos > Gafas de Sol > Ray-Ban Aviator).
export function generarSchemaMigas(items: { nombre: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
