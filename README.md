# Ópticas Fátima — Next.js + TypeScript + Tailwind

## Cómo correrlo

```
npm install
npm run dev
```

Eliminar .next
Eliminar node_modules

## Actualización: ficha técnica de productos corregida

Revisé tus 8 páginas reales de producto (`Productos_acuvue.zip`) y
encontré un problema en tu sitio original: **las 8 páginas tienen el
mismo precio ($308.900) y la misma ficha técnica** (Astigmatismo, 38%
de agua, Senofilcon A) — parecen copiadas del molde de "Acuvue Oasys"
sin personalizar cada producto. Solo el título y el resumen de uso (arriba
del todo) sí varían correctamente entre páginas.

En vez de copiar esos datos incorrectos a `lib/productos.ts`, busqué la
ficha técnica real de cada línea de producto en fuentes públicas del
fabricante y distribuidores oficiales de Acuvue, y quedó así:

| Producto | Material | Contenido de agua |
|---|---|---|
| Acuvue Oasys (con y sin astigmatismo, Multifocal) | Senofilcon A | 38% |
| Acuvue Vita (con y sin astigmatismo) | Senofilcon C | 41% |
| 1-Day Acuvue Moist (con y sin astigmatismo) | Etafilcon A | 58% |
| Acuvue 2 | Etafilcon A | 58% |

Los precios se mantienen como estaban en tu `productos.json` original
(que sí varían por producto, a diferencia de las páginas HTML). Vale la
pena que revises también tus 8 páginas de producto reales en el sitio
viejo — probablemente valga la pena corregir el precio y la ficha
técnica ahí también, más allá de esta migración.

### Para que funcione, necesitas configurar Supabase (gratis para este uso):

1. Crea una cuenta en [supabase.com](https://supabase.com) y un proyecto nuevo.
2. En el **SQL Editor** de tu proyecto, corre esto para crear la tabla:

   ```sql
   create table bonos (
     id uuid primary key default gen_random_uuid(),
     nombre text not null,
     email text not null,
     codigo text not null unique,
     confirmado boolean not null default false,
     creado_en timestamptz not null default now()
   );
   ```

## Actualización: usar el Bono Regalo como descuento en la compra

**⚠️ Antes de que esto funcione, necesitas correr una migración en tu
base de datos.** En Supabase → SQL Editor:

```sql
alter table bonos add column usado boolean not null default false;
alter table bonos add column usado_en timestamptz;
```

**Cómo funciona el flujo completo ahora:**

1. Cliente se registra en `/bono-regalo` → se genera el código →
   confirma por WhatsApp (como ya estaba).
2. **Tú confirmas el bono** en `/admin/bonos` (como ya estabas
   haciendo) — sin este paso, el bono no se puede usar todavía.
3. El cliente agrega productos al carrito y en `/cart` ve un campo
   nuevo: **"¿Tienes un código de Bono Regalo?"**
4. Al escribir el código y darle **"Aplicar"**, el sistema verifica en
   tiempo real contra la base de datos:
   - Si no existe → error claro
   - Si existe pero tú no lo has confirmado todavía → le pide que te
     escriba por WhatsApp primero
   - Si ya fue usado antes → error de que ya se usó
   - Si es válido → se aplica el descuento de $50.000 al total
5. Al darle **"Comprar ahora"**, el sistema marca el bono como
   **usado** en la base de datos (de forma segura ante dos compras
   simultáneas) y recién ahí abre WhatsApp con el mensaje — que ahora
   incluye el subtotal, el descuento aplicado, y el total con
   descuento.

**En el panel `/admin/bonos`** ahora vas a ver 3 estados en vez de 2:
**Pendiente** (recién registrado), **Confirmado** (ya lo verificaste,
listo para usarse) y **Utilizado** (ya se canjeó en una compra, con la
fecha). Si por alguna razón la compra no se concreta después de
canjear el bono, puedes revertirlo con "Revertir uso" para que el
cliente lo pueda volver a usar.

**Por qué el descuento se marca como "usado" al hacer clic en
"Comprar ahora" y no cuando tú confirmas la venta por WhatsApp:** como
el pago se sigue coordinando manualmente por WhatsApp (no hay pasarela
de pago automática todavía), este es el punto más confiable del
sistema para "cerrar" el bono — si esperáramos a que tú lo marques a
mano después de cada venta, sería fácil olvidarlo y que el mismo
código se preste para reutilizarse.

## Actualización: Panel de administración de Bonos

**Nueva ruta:** `/admin/bonos` (y `/admin` como índice, por si agregamos
más paneles después — ventas, inventario, etc.)

**Qué hace:**
- Pide una clave antes de mostrar nada (protección simple, no es un
  sistema de usuarios completo — ver nota abajo)
- Lista todos los registros del Bono Regalo: fecha, nombre, correo,
  código, y si está confirmado o pendiente
- Buscador por nombre/correo/código
- Botón para marcar cada uno como "Confirmado" (cuando ya verificaste
  el código que te llegó por WhatsApp) o revertirlo

**Para activarlo, agrega una variable de entorno más a tu `.env.local`:**

```
ADMIN_SECRET=elige-una-clave-larga-y-dificil-de-adivinar
```

Esa es la clave que vas a escribir en `/admin/bonos` para entrar. Se
guarda en la sesión del navegador (no queda escrita en ningún archivo),
así que si cierras el navegador tendrás que volver a escribirla.

**⚠️ Sobre qué tan segura es esta protección:** es una sola clave
compartida, suficiente para uso interno de un negocio pequeño, pero
más simple que un login real. No tiene usuarios individuales, no hay
"recuperar contraseña", y cualquiera con la clave puede entrar desde
cualquier dispositivo. Si en algún momento vas a tener varios empleados
usando el panel, o quieres saber quién hizo qué cambio, migramos esto a
NextAuth o Supabase Auth con cuentas individuales.

## Actualización: Bono Regalo y Registro unificados en un solo formulario

**⚠️ Necesitas correr esta migración en Supabase → SQL Editor antes de
usarlo:**

```sql
alter table bonos add column telefono text;
alter table bonos add column direccion text;
alter table bonos add column fecha_nacimiento date;
```

**Qué cambió:**

- El formulario de `/bono-regalo` ahora pide **nombre completo, correo,
  teléfono/WhatsApp, dirección y fecha de nacimiento** — los mismos 4
  campos que antes estaban solo en `/registro`, más el correo que ya
  pedía el bono.
- `/registro` ya no tiene formulario propio: ahora **redirige
  automáticamente a `/bono-regalo`**, por si alguien tenía guardado el
  enlace viejo o Google ya lo había indexado.
- Se eliminó `components/FormularioRegistro.tsx` (ya no se usa).
- El mensaje de WhatsApp que se arma al confirmar ahora incluye también
  el teléfono.
- El panel `/admin/bonos` ahora muestra el teléfono (bajo el correo) y
  la dirección + fecha de nacimiento (bajo el nombre), para que tengas
  toda la ficha del cliente sin salir de la lista.

**Por qué convertir `/registro` en redirección en vez de borrarlo
directo:** si alguien ya visitó esa página antes, tenía el link
guardado, o Google la indexó, un 404 se ve mal y pierde esa visita. La
redirección lo manda automáticamente a donde ahora sí puede
registrarse.

## Actualización: tablas separadas — `personas` + `bonos`

Se separó la información en 2 tablas relacionadas, y se reemplazaron
los 2 booleanos (`confirmado`, `usado`) por un solo campo `estado` con
3 valores fijos: `'pendiente'`, `'confirmado'`, `'utilizado'`. Esto deja
la base preparada para lo que hablamos de cuentas de cliente con
historial de compras e historial clínico más adelante — esas futuras
tablas se conectan a `personas`, no hay que volver a separar nada.

**⚠️ Corre esta migración completa en Supabase → SQL Editor — en este
orden, tal cual, para no perder los datos que ya tengas:**

```sql
-- 1. Tabla de personas (datos que no cambian según cuántos bonos tenga)
create table personas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null unique,
  telefono text,
  direccion text,
  fecha_nacimiento date,
  creado_en timestamptz not null default now()
);

-- 2. Migramos los datos que ya existían en la tabla vieja "bonos"
insert into personas (nombre, email, telefono, direccion, fecha_nacimiento, creado_en)
select nombre, email, telefono, direccion, fecha_nacimiento, creado_en
from bonos;

-- 3. Tabla nueva de bonos, ligada a personas por persona_id
create table bonos_nueva (
  id uuid primary key default gen_random_uuid(),
  persona_id uuid not null references personas(id),
  codigo text not null unique,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmado', 'utilizado')),
  creado_en timestamptz not null default now(),
  confirmado_en timestamptz,
  usado_en timestamptz
);

-- 4. Migramos los bonos existentes, calculando el estado a partir de
--    los booleanos viejos, y conectándolos con su persona por email
insert into bonos_nueva (persona_id, codigo, estado, creado_en, usado_en)
select
  personas.id,
  bonos.codigo,
  case
    when bonos.usado then 'utilizado'
    when bonos.confirmado then 'confirmado'
    else 'pendiente'
  end,
  bonos.creado_en,
  bonos.usado_en
from bonos
join personas on personas.email = bonos.email;

-- 5. Dejamos la tabla vieja como respaldo (por si algo salió mal) y
--    ponemos la nueva en su lugar
alter table bonos rename to bonos_legacy;
alter table bonos_nueva rename to bonos;
```

**Después de correrlo**, entra a `/admin/bonos` y confirma que todos
tus registros viejos aparezcan con el estado correcto. Si todo se ve
bien, unos días después puedes borrar `bonos_legacy` (`drop table
bonos_legacy;`) — mientras tanto, no estorba, solo queda como respaldo.

**Nota sobre `confirmado_en`:** los bonos que ya estaban confirmados
antes de esta migración no tienen guardada la fecha exacta en la que
los confirmaste (ese campo no existía), así que quedan con
`confirmado_en` vacío. Para los bonos nuevos de aquí en adelante, sí
se registra automáticamente.

**Sobre "Eliminar" en el panel:** ahora solo borra el bono, no la
persona — así, si en el futuro esa persona ya tiene compras o historial
clínico registrado, borrar un bono suyo no se lleva esos otros datos
por delante.

## Actualización: SEO y Open Graph

**Metadatos por página:** título, descripción, `og:*` y `twitter:*` en
todas las páginas reales (Inicio, Nosotros, Servicios, Contáctenos,
Registro, Bono Regalo, catálogo, cada producto, cada artículo del
blog). `/admin/*` y `/cart` quedaron con `noindex` — no tiene sentido
que Google los indexe.

**Imágenes Open Graph — generadas por código, no archivos:** en vez de
pedirte que subas artes para cada red social, usé `next/og` para
generarlas automáticamente:
- `app/opengraph-image.tsx` — imagen por defecto (Inicio y páginas sin una propia), con tu marca real
- `app/blog/[slug]/opengraph-image.tsx` — una por cada artículo, con su título real
- `app/productos/.../[slug]/opengraph-image.tsx` — una por cada producto, con su foto real y precio

Cuando compartas un link de tu sitio en WhatsApp, Facebook o Twitter/X,
va a mostrar automáticamente una de estas imágenes.

**`sitemap.xml` y `robots.txt`:** ambos se generan solos
(`app/sitemap.ts`, `app/robots.ts`) a partir de tus páginas reales,
artículos y productos — si agregas un artículo o producto nuevo a
`lib/articulos.ts` / `lib/productos.ts`, aparece automáticamente en el
sitemap, sin tocar nada más. Tu sitio original tenía varios sitemaps
separados; con este tamaño de catálogo uno solo alcanza.

**Antes de publicar, ajusta 2 cosas:**
1. Agrega a `.env.local`:
   ```
   NEXT_PUBLIC_SITE_URL=https://tudominio.com
   ```
   (mientras no tengas dominio, puedes dejarlo con tu URL de Vercel de
   prueba, o dejarlo vacío y usará `opticasfatima.com` por defecto,
   que probablemente no es el dominio correcto para tu sitio nuevo)
2. Las imágenes Open Graph de producto (`opengraph-image.tsx` de
   producto) cargan la foto real del producto desde esa misma URL —
   si pruebas esto en `localhost`, es normal que no cargue la imagen
   hasta que el sitio esté desplegado con `NEXT_PUBLIC_SITE_URL`
   apuntando a una URL pública real.


## Actualización: login real para /admin (reemplaza la clave compartida)

Ya no hay una sola clave (`ADMIN_SECRET`) — ahora `/admin` pide correo y
contraseña reales, con cuentas individuales manejadas por Supabase Auth
(el mismo Supabase que ya usas para los bonos).

**Cómo funciona:**
- `middleware.ts` protege automáticamente todo lo que esté bajo
  `/admin/*` — si no hay sesión, redirige a `/login`.
- `app/login/page.tsx` — formulario de correo/contraseña.
- Las rutas de API (`/api/admin/bonos`) ya no reciben ninguna clave por
  header: verifican la sesión real del usuario a través de las cookies.
- Hay botón de "Cerrar sesión" en el panel de bonos.

**Nuevos pasos de configuración (además de los que ya tenías):**

1. En tu proyecto de Supabase, ve a **Authentication → Users → Add user**
   y crea el usuario (o los usuarios) que van a administrar el sitio,
   con su correo y una contraseña.
2. En **Project Settings → API**, copia la clave **anon / public**
   (distinta a la "service_role" que ya tenías).
3. Agrégala a tu `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
   ```

   (las otras 2 variables de Supabase que ya tenías configuradas siguen
   igual — `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`)
4. `npm install` (para traer `@supabase/ssr`) y `npm run dev`.

**Ya no necesitas `ADMIN_SECRET`** — puedes borrar esa línea de tu
`.env.local`, quedó reemplazada por cuentas reales.

Para agregar o quitar administradores más adelante, se maneja desde el
mismo panel de Supabase (Authentication → Users) — no hace falta tocar
código.

## Actualización: Google Search Console + Google Analytics

### Google Search Console (para que Google indexe tu sitio)

1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Agrega tu dominio (elige **"Prefijo de URL"**, ej: `https://opticasfatima.com`
   — más simple que la opción "Dominio", que pide verificar por DNS)
3. Google te va a dar una etiqueta HTML tipo:
   ```
   <meta name="google-site-verification" content="ABC123..." />
   ```
   Solo necesitas el valor de `content` (la parte `ABC123...`)
4. Agrégalo como variable de entorno (en `.env.local` y en Vercel):
   ```
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123...
   ```
5. Redeploy en Vercel, y en Search Console dale a **"Verificar"**
6. Una vez verificado, ve a **Sitemaps** (menú izquierdo) y pega:
   ```
   sitemap.xml
   ```
   Con eso Google ya sabe encontrar todas tus páginas, artículos y
   productos automáticamente (recuerda que se generan solos).

### Google Analytics (para ver cuánta gente visita el sitio)

1. Ve a [analytics.google.com](https://analytics.google.com) y crea una
   cuenta + una propiedad para tu sitio (elige **GA4**, es la versión
   actual)
2. Cuando te pida la plataforma, elige **Web**, pon tu dominio
3. Te va a dar un **Measurement ID** con formato `G-XXXXXXXXXX`
4. Agrégalo como variable de entorno:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
5. Redeploy en Vercel

Usé la librería oficial de Next.js (`@next/third-parties`) en vez de
pegar el script de Google a mano — carga de forma optimizada y no
bloquea el resto de la página. **Mientras no configures
`NEXT_PUBLIC_GA_ID`, Analytics simplemente no se carga** — no hay
riesgo de que quede a medias.

Después de un par de días con tráfico real, en Analytics vas a poder
ver qué páginas visita más la gente, desde dónde te encuentran, y
cuántos completan el registro del Bono Regalo.

## Actualización: formulario de fórmula (RX) según el tipo de lente

**Para cuando agregues productos nuevos**: solo asigna el
`tipoFormula` correcto en `lib/productos.ts` — el formulario, el
carrito y el mensaje de WhatsApp se ajustan solos, sin tocar ningún
otro archivo.

## Actualización: animaciones al hacer scroll

**Detalles técnicos:**
- `components/AosProvider.tsx` — inicializa AOS una sola vez y lo
  refresca en cada cambio de página (necesario porque Next.js navega
  sin recargar, y AOS por defecto no se entera de eso)
- Las animaciones se disparan **una sola vez** por elemento (no se
  repiten si subes y bajas la página) — es el comportamiento estándar
  y menos molesto
- Instala la dependencia nueva con `npm install` antes de correr el
  proyecto (agregué `aos` y `@types/aos` a `package.json`)

**Para ajustar cualquier animación después**: cada atributo
`data-aos="..."` acepta estos valores (entre otros): `fade-up`,
`fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out`,
`flip-left`, `flip-right`. `data-aos-delay="200"` retrasa el inicio
(en milisegundos), y `data-aos-duration="800"` cambia cuánto dura.

## Actualización: Header con glassmorphism (vidrio esmerilado)


- **Fondo translúcido con blur**: `bg-white/70` + `backdrop-blur-lg` +
  `backdrop-saturate-150` — el contenido que pasa por debajo al hacer
  scroll se ve difuminado a través del header, en vez de quedar
  tapado por un blanco sólido
- **Sombra suave en vez de la sombra dura original**: antes usaba
  `shadow-header` (una sombra marcada, `6px 6px 32px`) — ahora una
  sombra mucho más sutil, más propia del estilo "vidrio flotante".
  No toqué `shadow-header` en `tailwind.config.ts` porque la siguen
  usando otras cajas del sitio (formulario de producto, buscador,
  tarjeta del bono) y cambiarla ahí las habría afectado a todas
- **Borde inferior semitransparente** (`border-white/30`) en vez de
  ningún borde, para separar el header del contenido sin una línea dura
- **La barra superior (redes sociales/correo) se mantiene con el color
  sólido de marca** — ahí sí quise que la información de contacto se
  lea con total nitidez, sin competir con el efecto de vidrio
- El buscador desplegable y el menú móvil llevan el mismo tratamiento,
  para que se sienta como una sola pieza de vidrio, no un header con
  estilo distinto a sus propios menús

Este efecto se aprecia mejor sobre el banner/hero (que tiene imagen de
fondo) y al hacer scroll sobre cualquier página con contenido detrás.

## Actualización: menú hamburguesa — X limpia y efecto circular restaurado

**1. La animación a "X" se veía distorsionada** porque usaba
`origin-bottom-left` con `translate` y `rotate` combinados de forma
poco precisa. La reconstruí con la técnica estándar (3 líneas
posicionadas de forma absoluta que convergen al centro antes de
rotar) — ahora siempre forma una X perfecta, sin importar el ángulo.

**2. El efecto circular que tenía el sitio original** (el menú se
revela con un círculo que crece desde la esquina inferior izquierda,
en vez de solo aparecer/desaparecer) se había perdido en la
conversión — ya está de vuelta, usando `clip-path` animado. También
bloqueé el scroll del fondo mientras el menú está abierto, ya que
ahora ocupa toda la pantalla.

Ambos cambios son solo en `components/Header.tsx`, sin tocar nada más.
## Actualización: estructura para múltiples categorías de producto (Fase 1)

Vamos a agregar Gafas de Sol, Monturas, Gotas y Soluciones en fases,
sin tocar de golpe lo que ya funciona con lentes de contacto. Esta
primera fase es el **modelo de datos y los componentes base** —
todavía no cambia ninguna ruta en vivo, así que el sitio sigue
funcionando exactamente igual mientras tanto.

**Archivos nuevos:**
- `lib/categorias.ts` — el catálogo de las 5 categorías (lentes de
  contacto, gafas de sol, monturas, gotas, soluciones), cada una con
  si necesita o no formulario de fórmula (`tieneFormula`)
- `components/CatalogoProductos.tsx` — catálogo genérico: los filtros
  de "Defecto visual" y "Reemplazo" solo aparecen si esa categoría
  tiene esos campos. Para lentes de contacto se ve igual que antes;
  para una categoría nueva sin esos campos, simplemente no aparecen
  esos filtros — no hay que configurar nada aparte

**Archivos generalizados:**
- `lib/productos.ts` — el tipo `Producto` ahora tiene un campo
  `categoria` obligatorio, y todos los campos exclusivos de lentes de
  contacto (fórmula, material, contenido en agua, etc.) pasaron a ser
  opcionales. Agregué también un campo `atributos` genérico
  (clave/valor) para la ficha técnica de categorías sin fórmula
- `context/CartContext.tsx` — el carrito ahora acepta 2 formas de
  ítem: `"formula"` (con fórmula por ojo, como ahora) o `"simple"`
  (solo cantidad, para gafas de sol/monturas/gotas/soluciones)
- `components/ProductoDetalle.tsx` — se separó en 2 formularios: uno
  con fórmula (el que ya conocías) y uno simple (imagen + cantidad +
  agregar al carrito), y muestra el correcto según si el producto
  tiene `tipoFormula` o no
- `app/cart/page.tsx` — ya sabe mostrar ambos tipos de ítem en el
  carrito y en el mensaje de WhatsApp

**Lo que NO cambié todavía** (siguientes fases): las rutas siguen
siendo `/productos/lentesdecontacto/...` de forma fija, y el
componente viejo `CatalogoLentesContacto.tsx` sigue siendo el que usa
la página en vivo — lo reemplazo por el genérico en la Fase 2, junto
con las rutas.

## Próximas fases

**Fase 2 — Rutas genéricas:** convertir `/productos/lentesdecontacto`
en `/productos/[categoria]`, para que cada categoría nueva funcione
sola sin crear carpetas a mano. Las URLs actuales de lentes de
contacto no cambian.

**Fase 3 — Navegación:** agregar las categorías nuevas al menú, a la
página de inicio, al buscador y al sitemap (con un aviso de
"Próximamente" mientras no tengan productos reales).

¿Seguimos con la Fase 2?

## Actualización: rutas genéricas por categoría (Fase 2)

Al revisar el proyecto encontré que gran parte de esta fase ya estaba
resuelta (`/productos/[categoria]/...`, con validación de que el slug
pertenezca a la categoría correcta, y el catálogo genérico ya
conectado) — completé lo que faltaba:

**Nuevo: `/productos`** — índice general con las 5 categorías. Las que
ya tienen productos muestran "Ver catálogo →"; las que todavía no,
muestran "Próximamente" (sin enlace roto, la ruta ya existe y muestra
un mensaje amable en vez de un catálogo vacío).

**Ya confirmado sin cambios necesarios:**
- Las URLs de lentes de contacto no cambiaron
  (`/productos/lentesdecontacto/...`) — la carpeta fija vieja y el
  componente de catálogo viejo ya no existen, todo pasa por las rutas
  genéricas
- El buscador y el sitemap ya arman las URLs de producto a partir de
  `p.categoria`, no de un valor fijo
- Los enlaces de "Lentes De Contacto" en Servicios y en la página de
  "sin resultados" del buscador siguen apuntando bien (son URLs
  literales correctas, no hace falta que sean "genéricos")

## Progreso

1. ✅ Modelo de datos y componentes
2. ✅ Rutas genéricas + índice de categorías
3. ⬜ Navegación (menú, home, categorías nuevas visibles)

¿Seguimos con la Fase 3?

## Actualización: navegación de las categorías (Fase 3, final)

- **Menú principal del header**: se agregó "Productos" entre Servicios
  y Contáctenos — lleva al índice `/productos` con las 5 categorías.
  Aparece igual en el menú móvil (usa la misma lista).
- **Footer**: enlace a "Productos" junto a Términos y Política de Privacidad.
- **Buscador**: "Productos" ahora es una de las páginas fijas que
  encuentra el buscador; dejé el enlace de "sin resultados" apuntando
  directo al catálogo de lentes de contacto (sigue siendo la sugerencia
  más útil mientras es la única categoría con productos reales).

No toqué las tarjetas de "Nuestros Servicios" del home (Lentes
Formulados, Gafas De Sol, etc.) — esas son enlaces a artículos
educativos del blog, no al catálogo, así que agregar ahí las 4
categorías nuevas vacías las habría llenado de tarjetas
"Próximamente" sin aportar nada todavía.

## 🕶️ Estructura multi-categoría: completa

Con esto se cerraron las 3 fases. Resumen de cómo agregar una
categoría nueva de aquí en adelante:

1. Sus productos van a `lib/productos.ts`, con `categoria: "gafasdesol"`
   (o la que sea) y los campos que le apliquen (`atributos` para la
   ficha técnica si no tiene fórmula)
2. Automáticamente aparece en: `/productos` (índice), su propio catálogo
   en `/productos/[categoria]`, cada producto en
   `/productos/[categoria]/[slug]`, el buscador, y el sitemap
3. No hay que tocar rutas, ni el menú, ni el carrito — todo ya está
   preparado para recibirla

## Actualización: productos de ejemplo para probar las categorías nuevas

Agregué **2 productos ficticios por cada categoría nueva** (8 en
total) a `lib/productos.ts`, para que puedas ver funcionando el
catálogo, los filtros, la página de producto (formulario simple sin
fórmula), y el carrito con las 4 categorías que todavía no tenían
nada real:

- **Gafas de sol**: Ray-Ban Aviator Clásica, Oakley Holbrook
- **Monturas**: Ray-Ban Wayfarer Óptica, Vogue Eyewear Redonda
- **Gotas**: Systane Ultra, Refresh Tears
- **Soluciones**: ReNu MultiPlus, Opti-Free PureMoist

**⚠️ Son 100% de prueba — no los publiques así:**
- Los nombres, precios y marcas son inventados (aunque de productos
  reales que existen en el mercado, no tienen que ver con lo que tú
  vendes específicamente)
- Las imágenes son marcadores de posición genéricos
  (`placehold.co`) — no fotos reales
- Cada uno tiene `"(producto de prueba)"` en el título y
  `"Producto de ejemplo — reemplazar..."` como primera línea de
  descripción, para que sea imposible confundirlos con productos
  reales si los ves en el sitio
- Los `id` empiezan con `DEMO-` para que sean fáciles de encontrar y
  borrar cuando tengas los productos reales

**Para reemplazarlos por productos reales**: edita cada uno en
`lib/productos.ts` (o bórralos y agrega los tuyos) — no hace falta
tocar ninguna ruta, filtro, ni el carrito; todo ya está conectado
automáticamente a partir del campo `categoria`.

## Corrección: menú móvil solo se veía "de la mitad hacia abajo"

**Causa real:** el header tiene `backdrop-blur` (el efecto de vidrio
esmerilado). En CSS, cualquier elemento con `backdrop-filter` o
`filter` crea un nuevo "contenedor de posicionamiento" para sus
elementos descendientes que usan `position: fixed`. El menú de
pantalla completa vivía *dentro* del `<header>`, así que su `fixed
inset-0` (pensado para cubrir toda la pantalla) terminaba
posicionándose relativo al header —que solo mide unos 144px de alto—
en vez de relativo a la ventana completa. Por eso solo se veía una
porción, no el menú entero.

**Solución:** saqué el menú móvil para que sea **hermano** del
`<header>`, no su hijo — ahora el componente devuelve ambos dentro de
un Fragment (`<>...</>`) en vez de anidar uno dentro del otro. Su
`position: fixed` ahora sí es relativo a toda la ventana.

Solo cambió `components/Header.tsx`.

## Actualización: galería de 2-3 imágenes por producto

Cada producto puede tener fotos adicionales, que se muestran como
miniaturas clicables debajo de la imagen principal en su página de
detalle.

**Cómo agregarlas:** en `lib/productos.ts`, cualquier producto puede
llevar el campo opcional `galeria` con hasta 2-3 fotos más:

```ts
{
  imagen: "/img/catalogo/mi-producto.jpg",   // sigue siendo la principal
  galeria: [
    "/img/catalogo/mi-producto-2.jpg",
    "/img/catalogo/mi-producto-3.jpg",
  ],
  // ...el resto del producto igual que siempre
}
```

Si no agregas `galeria`, el producto se ve exactamente igual que
antes (solo la imagen principal, sin miniaturas) — no es obligatorio
para ningún producto.

**Dónde se usa cada imagen:**
- `imagen` (la principal) → catálogo, carrito, imagen para
  WhatsApp/redes sociales — igual que siempre
- `galeria` (las adicionales) → **solo** en la página de detalle del
  producto, como miniaturas junto a la principal

Le agregué un ejemplo funcional a 2 de los productos de prueba
("Ray-Ban Aviator" con 2 fotos extra, "Ray-Ban Wayfarer" con 1) para
que veas cómo se ve funcionando — entra a cualquiera de los dos en
`/productos/gafasdesol` o `/productos/monturas`.

Nuevo componente: `components/GaleriaImagenes.tsx`.

## Actualización: efecto de lupa en la imagen del producto

Al pasar el cursor sobre la imagen principal de cualquier producto,
aparece un círculo que sigue el mouse mostrando esa zona ampliada
2.5x — el clásico efecto de las tiendas en línea para ver el detalle
de un producto sin salir de la página.

**Detalles:**
- Solo aplica a la **imagen principal** (grande) — las miniaturas de
  la galería no tienen lupa, para no saturar
- Solo se activa en pantallas donde tiene sentido usar el mouse
  (`sm:` en adelante) — en celular no aparece, ya que ahí la lupa no
  aporta (no hay cursor que seguir)
- Nuevo componente: `components/ImagenConLupa.tsx`, conectado dentro
  de `components/GaleriaImagenes.tsx` — no tuviste que tocar nada en
  `lib/productos.ts`, funciona automáticamente con la imagen que ya
  tenga cada producto

## Actualización: datos estructurados (Schema.org / JSON-LD)

Nuevo archivo `lib/schema.ts` con 4 tipos de datos estructurados,
conectados donde corresponde:

- **Negocio (`Optician`)** — en `app/layout.tsx`, aparece en **todas**
  las páginas: nombre, dirección, teléfono, horario real (de tu
  Footer), y tus redes sociales
- **Producto** — en cada página de producto: precio, marca,
  disponibilidad y categoría. Es lo que habilita que Google muestre
  precio/disponibilidad directamente en los resultados de búsqueda
- **Artículo (`BlogPosting`)** — en cada artículo del blog
- **Migas de pan (`BreadcrumbList`)** — en productos y artículos,
  ayuda a Google a mostrar la ruta (Inicio > Productos > Gafas de Sol
  > ...) en los resultados

**⚠️ Encontré una inconsistencia real en tus datos** que vale la pena
que corrijas: el número de WhatsApp del **Header**
(`573206740505`) no coincide con el de la lista de redes del
**Footer** (`573043446574`). Usé el del Header para los datos
estructurados porque es donde vive tu enlace principal de "escríbenos
por WhatsApp", pero confirma cuál es el correcto y avísame para
dejarlo consistente en todo el sitio (y corregirlo también en
`lib/schema.ts`).

**Cómo verificar que funciona:** después de desplegar, pega la URL de
tu sitio (o de una página de producto específica) en la [herramienta
de prueba de resultados enriquecidos de
Google](https://search.google.com/test/rich-results) — te muestra
exactamente qué detecta.
