# Ópticas Fátima — Next.js + TypeScript + Tailwind

## Cómo correrlo

```
npm install
npm run dev
```

**⚠️ Muy importante — revisa `lib/productos.ts` antes de publicar:**
Solo tenía la página completa de UN producto ("Acuvue Oasys con
HydraClear Plus"). Para los otros 7, inventé la ficha técnica (afección
visual, material, % de agua, descripción) para que la maqueta se viera
completa — **no son datos reales de Acuvue**. Reemplázalos con la
información verdadera antes de que esto salga a producción (tienes esas
8 páginas de producto en tu proyecto original — compártemelas y las
extraigo igual que hice con el blog).

## Actualización: Registro y Bono Regalo

- `app/registro/page.tsx` — tu HTML original solo tenía un comentario
  describiendo los campos deseados (nombre, fecha de nacimiento,
  dirección, teléfono); nunca se construyó el formulario. Ya lo armé
  funcional en `components/FormularioRegistro.tsx`.
- `app/bono-regalo/page.tsx` — tenía el formulario en HTML pero sin
  ningún JavaScript que lo procesara. Ya lo armé en
  `components/FormularioBono.tsx`: al enviar, muestra el mensaje de
  confirmación (antes esto no pasaba nunca, porque no había handler).

**⚠️ Ninguno de los dos formularios envía datos a ningún lado todavía**
— ahora mismo solo muestran el mensaje de éxito en el navegador. Para
que funcionen de verdad necesitas conectarlos a algo, por ejemplo:
- Una base de datos (Supabase, etc.) para guardar los registros
- Un servicio de email marketing (Mailchimp, Brevo) para enviar el bono
- O simplemente que el formulario también arme un mensaje de WhatsApp,
  igual que hicimos con el carrito

Dime si quieres que conecte alguno de los dos a algo concreto.

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

## Actualización: Bono Regalo con código + WhatsApp

**Cómo funciona ahora:**
1. El cliente llena nombre y correo en `/bono-regalo`.
2. Se guarda en una base de datos (Supabase) junto con un código
   alfanumérico único de 8 caracteres (`lib/codigo.ts`).
3. Se abre WhatsApp automáticamente con un mensaje ya armado (nombre,
   correo y código) dirigido a tu número — el cliente solo tiene que
   darle "Enviar" para confirmar.
4. Tú recibes ese mensaje en tu WhatsApp de negocio y puedes verificar
   el código contra la base de datos antes de entregar el bono.

**Archivos nuevos:**
- `lib/codigo.ts` — genera el código (evita caracteres confusos como 0/O, 1/I)
- `lib/supabase.ts` — cliente de Supabase para el servidor
- `app/api/bono/route.ts` — guarda el registro y devuelve el código
- `components/FormularioBono.tsx` — ahora llama a la API real

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

3. En **Project Settings → API**, copia:
   - **Project URL**
   - **service_role key** (no la "anon" — esta necesita permisos de escritura)
4. Crea un archivo `.env.local` en la raíz del proyecto (no lo subas a
   git, ya debería estar ignorado) con:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=tu-clave-de-servicio
   ```

5. `npm install` (para traer `@supabase/supabase-js`) y `npm run dev`.

**⚠️ Importante sobre dónde publicarlo:** esta ruta de API necesita un
servidor Node.js corriendo (no un hosting puramente estático). Vercel
(el creador de Next.js) funciona automáticamente para esto y tiene plan
gratuito — es la opción más simple.

**Pendiente si quieres cerrarlo del todo:** ahora mismo cualquiera podría
escribir "confirmado = true" a mano en la base de datos, o tú tendrías
que hacerlo manualmente al recibir el WhatsApp. Si quieres, el siguiente
paso natural es una página `/admin` (protegida con login) donde veas la
lista de códigos pendientes y los marques como confirmados/canjeados con
un clic.

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

## Actualización: favicon con tu logo real (corona)

Reemplacé los íconos generados por código con tu imagen real de la
corona:
- `app/icon.png` — favicon 32×32, fondo transparente
- `app/apple-icon.png` — 180×180, con fondo azul de marca (iOS no
  respeta la transparencia, así que ahí sí necesita fondo sólido)

Recorté el espacio en blanco alrededor de la corona antes de reducirla,
para que ocupe el lienzo completo y se vea lo más nítida posible.

**Una advertencia honesta**: tu logo tiene mucho detalle fino (las
cuentas de la corona, los trazos delgados), y a 32px — o los 16px que
usan algunos navegadores — ese detalle se pierde un poco y se ve algo
borroso en la pestaña. A 180px (ícono de iOS) se ve nítido y bien. Si
al verlo en el navegador te parece demasiado borroso, una alternativa
es una versión simplificada del logo (solo la silueta de la corona, sin
las cuentas) que aguante mejor el tamaño chico — dime si quieres que
pruebe eso.

Ya no están `app/icon.tsx` ni `app/apple-icon.tsx` (los generados por
código) — Next.js ahora usa directamente estos dos `.png`.

## Actualización: protección contra spam en el Bono Regalo

Tres capas, cada una bloquea un tipo distinto de abuso:

**1. Campo trampa (honeypot)** — ya está activo, no requiere configuración.
Un campo invisible que las personas nunca ven ni llenan, pero que los
bots simples sí llenan porque completan todos los inputs del formulario.
Si llega lleno, se ignora la petición sin gastar un código real.

**2. Captcha real (Cloudflare Turnstile)** — bloquea bots más
sofisticados. Es gratis y, a diferencia de reCAPTCHA, no le pide al
usuario "elige las fotos con semáforos" — casi siempre pasa solo, sin
interacción. **Necesitas activarlo:**

1. Crea una cuenta gratis en [Cloudflare](https://dash.cloudflare.com) (no
   hace falta que tu dominio esté en Cloudflare, Turnstile funciona
   igual)
2. Ve a **Turnstile** en el menú lateral → **Add Site**
3. Pon el dominio de tu sitio (o `localhost` mientras pruebas)
4. Copia las 2 claves que te da y agrégalas a tus variables de entorno
   (`.env.local` y en Vercel):
   ```
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=tu-site-key
   TURNSTILE_SECRET_KEY=tu-secret-key
   ```
5. Redeploy en Vercel.

**Mientras no configures esas 2 variables, el captcha simplemente no
aparece** — el formulario sigue funcionando (con las otras 2 capas de
protección), pero sin verificación real de "soy humano".

**3. Límite por correo** — ya está activo, no requiere configuración.
Si el mismo correo ya generó un bono en las últimas 24 horas, se
rechaza con un mensaje claro en vez de generar otro código. Esto evita
que alguien (o un script) genere decenas de códigos con el mismo
correo. El número de horas está en `app/api/bono/route.ts`
(`HORAS_ENTRE_INTENTOS`) por si quieres ajustarlo.

**Nota:** el límite por correo es fácil de burlar usando correos
distintos cada vez — no reemplaza el captcha, lo complementa. Si más
adelante ves abuso a pesar de esto, la siguiente capa sería limitar
también por IP.

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

## Actualización: correo único + eliminar registros en el panel

**1. Un correo = un solo bono, para siempre.** Antes solo se bloqueaba
si el mismo correo pedía otro bono dentro de las siguientes 24 horas;
ahora se verifica sin límite de tiempo — si el correo ya existe en la
base de datos, se rechaza con el mensaje "Este correo ya ha sido
registrado.", sin importar cuánto tiempo haya pasado. También se
normaliza el correo a minúsculas antes de guardarlo, para que
"Juan@Gmail.com" y "juan@gmail.com" cuenten como el mismo.

**2. Botón "Eliminar" en `/admin/bonos`.** Por si necesitas borrar un
registro erróneo (un correo mal escrito, una prueba tuya, etc.). Pide
confirmación antes de borrar y es **permanente** — no hay forma de
recuperar un registro eliminado, a diferencia de "Revertir
confirmación" o "Revertir uso", que sí se pueden deshacer.

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
