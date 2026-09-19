# Imprenta Reverte — sitio web

Sitio **informativo** de Imprenta Reverte (Ciudad Valles, SLP). No es tienda en
línea: no hay carrito, ni precios publicados, ni pagos. Sirve para que el
cliente consulte el catálogo y pida una cotización.

Construido con **Astro 5 + Tailwind 3 + TypeScript**, el mismo stack que
`../mariostintshop`.

## Diseño: réplica de printshopsolution.com/es/

La estructura, el orden de secciones y la retícula replican
`https://www.printshopsolution.com/es/` y están aprobadas. La tipografía y la
paleta ya NO: son el sistema propio de Reverte.

Dirección: **Editorial Mexican Heritage + Contemporary Digital Craft**. Una
imprenta histórica mexicana que evolucionó al mundo digital — no una imprenta
antigua con una web moderna encima.

### Sistema tipográfico

Dos familias, y cada una tiene un trabajo distinto:

- **Cormorant Garamond** → emoción, herencia, editorial.
- **DM Sans** → información, interfaz, modernidad.

**DM Sans es el default de todo**, headings incluidos. Cormorant NO es un
default: se pide a mano con la clase `.editorial`, y vive solo en el **título de
las páginas interiores** (`PageHead`) y en los H1 de `404` y `gracias`.

El home no lleva ni un Cormorant: el hero y el titular institucional
("Una imprenta de Ciudad Valles…") se probaron en serif y se descartaron. En el
home la tradición la carga el logo, no la tipografía.

Si vas a añadir un heading, el default correcto es DM Sans. `.editorial` es para
títulos de página, no para títulos de sección.

`.editorial` lleva `font-synthesis-weight: none`: de Cormorant solo se cargan
500 y 600, y sin eso el navegador falsifica la negrita en los títulos que
arrastran `font-semibold` y ensucia el dibujo del serif.

### Paleta

| Rol | Token | Valor |
|---|---|---|
| Autoridad y estructura | `brand` | `#0B2545` navy |
| Firma de marca | `accent` | `#C8A44D` oro — **solo acento** |
| Papel, oficio, materialidad | `paper` | `#FAF7F2` — fondo alterno |
| Institucional / transición | `mist` | `#EDF2F7` — con cuentagotas |
| Texto | `ink` | `#111827` (17.7:1 sobre blanco) |
| Texto secundario | `ash` | `#667085` (4.97:1 sobre blanco) |
| Filete | `line` | `#E3E8EF` |
| Firma de imprenta | `cmykC/M/Y/K` | `#0090D8` `#D80078` `#F0D818` `#111111` |

Proporción buscada: ~70% blanco/papel · 20% navy · 7% mist · 3% oro.
Blanco/papel = espacio · navy = estructura · oro = acento · CMYK = firma.

**El oro es de bajo contraste y no sirve para todo.** Medido:

| combinación | ratio | |
|---|---|---|
| oro + texto blanco | 2.37:1 | ✗ nunca |
| oro como texto sobre blanco | 2.37:1 | ✗ nunca |
| oro como texto sobre papel | 2.21:1 | ✗ nunca |
| oro + texto navy | 6.50:1 | ✓ la única válida |

Por eso `.btn-accent` lleva texto navy, y los asteriscos de campo obligatorio
del formulario van en magenta CMYK (`#D80078`, 4.9:1) y no en oro.

El oro va plano: nunca degradados imitando el cromado del logo.

`ash` sobre `mist` da 4.42:1, un pelo por debajo de 4.5 — usa `ash` sobre
blanco o papel, no sobre mist.

### Botones

- `.btn-brand` — **primario**. Navy con texto blanco (15.4:1). Es el botón por
  defecto del sitio: la autoridad la lleva el navy. 12 usos.
- `.btn-accent` — **secundario**. Oro con texto navy. Es el acento de firma y
  por eso es raro: 2 usos en todo el sitio. Si empieza a repetirse, pierde
  exactamente aquello que lo hace valer.
- `.btn-outline` — terciario.

### Firma CMYK

Dos piezas, ambas sutiles:

- `.franja-cmyk` — filete de registro de 3px y 116px de ancho pegado al filo,
  como la barra de registro al margen de un pliego. Va en la barra promocional
  del header, que antes era un degradado arcoíris heredado de la referencia.
- `src/components/Diana.astro` — la diana del logo en SVG, variantes `sola`
  (bullets, detalles) y `separador`. Ver `Giros.astro`.

El diseño original de la diana no se toca, y no se convierte en decoración
repetitiva: es una firma de oficio, no un patrón.

**Orden de secciones del home**, rediseñado sobre el patrón de
`colorciti.com.mx` (más compacto que la referencia original de
printshopsolution): barra promo con filete CMYK → cabecera con buscador píldora
→ fila de navegación → hero estático a pantalla completa → nosotros
(`Experiencia.astro`) → servicios (`Servicios.astro`, los 6 rubros de `NAV`) →
portafolio en grid (`Portafolio.astro`, con placeholders honestos — ver
PENDIENTES.md) → proceso estilo mapa (`Proceso.astro`) → reseñas
(`Testimonios.astro`) → marcas que confían (`Giros.astro`) → formulario
(`QuoteCTA.astro`) → mapa (`Location.astro`) → footer navy.

Los componentes de la estructura anterior (`PromoDuo`, `Carrusel`,
`BannerSky`, `TresManeras`, `Mosaico`, `Distintivos`, `CtaDuo`, `Contacto`)
siguen en `src/components/` sin usarse en ninguna página — se conservan por si
conviene reaprovechar alguno más adelante, no por descuido.

**Lo que NO se replicó, a propósito:** carrito, login, precios y alta al
boletín. El negocio pidió un sitio informativo, no una tienda en línea. Donde
la referencia pone "Comienza desde $16.67" va una muestra de los trabajos de
esa categoría, y donde va el boletín está el teléfono con la dirección.

El borde de papel rasgado es una máscara SVG en `--torn` (`global.css`).
Hereda el `background` del elemento, así que sirve sobre cualquier sección sin
tocar el color a mano.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + build a dist/
npm run preview
```

## Estructura

```
src/
  data/catalogo.ts     ← EL CATÁLOGO. Transcrito y verificado contra el PDF.
  consts.ts            ← todo el contenido del sitio (textos, contacto, fotos)
  layouts/Layout.astro ← <head>, SEO, JSON-LD, scripts compartidos
  components/          ← secciones, todas alimentadas por consts.ts
  pages/
    index.astro
    catalogo/index.astro    ← catálogo completo (filtra con ?q= del buscador)
    catalogo/[slug].astro   ← una página por categoría (9)
    cotizar.astro           ← solicitar cotización
    contacto.astro          ← ubicación, mapa y formulario
    preguntas-frecuentes.astro
    privacidad.astro        ← aviso de privacidad (LFPDPPP)
    terminos.astro          ← términos y condiciones
    accesibilidad.astro     ← declaración de accesibilidad
    gracias.astro
    404.astro
    api/cotizar.ts          ← única ruta con servidor (Resend)
```

### El catálogo es la fuente única

`src/data/catalogo.ts` define las 16 categorías del catálogo (más "Otros
servicios de imprenta", que no viene del PDF: es la válvula de seguridad para
peticiones que no encajan en ninguna). **De ese archivo salen a la vez** la
sección "Servicios" de la home, las páginas de categoría, el índice del
catálogo, el `<select>` del formulario, la validación del servidor, los
enlaces del footer y el `hasOfferCatalog` del JSON-LD.

Las 16 categorías están organizadas por TÉCNICA de producción (DTF,
Serigrafía, Bordado, Grabado láser…), no por objeto físico — así lo presenta
el catálogo real. Cada una lleva `productos: ProductoCatalogo[]`, con el
nombre y la técnica de impresión de cada producto tal como los rotula el PDF;
cuando el catálogo no especifica una técnica, el campo dice literalmente
`'No especificado en el catálogo'` — nunca se infiere. `ejemplos` se deriva
automáticamente de `productos` (los primeros nombres), no se mantiene a mano
por separado.

`NAV` en `src/consts.ts` agrupa las 16 categorías en 6 rubros de navegación
(Papelería, Sellos e impresión comercial, Gran formato, Textil y
promocionales, Grabado y sublimación, Eventos y calendarios), para que el menú
no tenga 17 pestañas. La sección "Servicios" del home reutiliza ese mismo
agrupamiento — no hay una lista de servicios aparte.

Añadir una categoría en `catalogo.ts` genera su página, su tarjeta y su opción
de formulario sin tocar nada más. Lo único que conviene añadirle es su bloque
visual (foto, resumen, descripción) en `CATEGORIAS_UI` dentro de
`src/consts.ts`; si no lo añades, la categoría igual funciona con valores por
defecto.

El campo `noIncluye` no es decorativo: es lo que se muestra en el recuadro
"Esto va en otra categoría". Con 16 categorías agrupadas por técnica hay más
fronteras finas que marcar que con las 9 anteriores — DTF vs. Serigrafía vs.
Bordado imprimen los tres sobre tela, y Sublimación vs. Grabado láser marcan
los dos objetos rígidos.

Las rutas de categoría que cambiaron de slug al pasar de 9 a 16 categorías
tienen su redirect 301 en `astro.config.mjs`, para no perder un enlace que ya
estuviera indexado.

## Formulario de cotización (Resend)

`src/pages/api/cotizar.ts` es la única ruta que corre en servidor
(`prerender = false`); el resto del sitio es HTML estático.

**El sitio funciona sin configurar Resend.** Si falta la API key, el lead no se
pierde ni devuelve error: se escribe en el log del servidor y el usuario ve la
página de gracias igual. Así se puede publicar antes de tener la cuenta lista.

Para que además llegue por correo:

1. Crea una API key en <https://resend.com/api-keys>.
2. Verifica el dominio remitente en Resend (Domains → Add Domain, y agrega los
   registros DNS). Para probar sin dominio propio puedes usar
   `onboarding@resend.dev` como remitente.
3. Copia `.env.example` a `.env` y rellena:
   - `RESEND_API_KEY`
   - `QUOTE_TO_EMAIL` — a dónde llegan las cotizaciones
   - `QUOTE_FROM_EMAIL` — remitente, en el dominio verificado
4. En Vercel, mete esas tres variables en **Settings → Environment Variables**
   y vuelve a desplegar.

Campos del formulario: solo cuatro, todos obligatorios — nombre, teléfono
(10 dígitos), ciudad y código postal (5 dígitos). No se pide correo ni detalles
del trabajo: el formulario capta el dato de contacto y lo demás lo pregunta un
asesor por teléfono. Las páginas de categoría mandan además su slug en un
campo oculto (`categoria`); se comprueba contra `SLUGS_CATALOGO` y, si no
existe, se ignora sin rechazar el lead. La validación se hace en el servidor,
no solo en el navegador.

Antispam: campo trampa (`empresa_web`) oculto. Si viene lleno se responde con
éxito sin mandar nada, para no enseñarle al bot qué lo delató.


## Rutas de captación

| Ruta | Para qué | Origen del lead |
|---|---|---|
| `/` | el sitio | `sitio` |
| `/cotizar/` | formulario del sitio | `sitio` |
| `/promo/` | anuncios de Meta | `promo_meta_ads` |
| `/bio/` | enlace de la bio de Instagram | `bio_instagram` |
| `/bio/?ref=fb` | enlace de la bio de Facebook | `bio_facebook` |

Las dos nuevas son **páginas de conversión, no secciones del sitio**: llevan
`noindex`, están fuera del sitemap y no montan `Header` ni `Footer`.
`Layout.astro` es solo el `<head>` y un `<slot />`, así que se reutiliza sin
arrastrar navegación.

**La diferencia entre las dos es deliberada.** `/promo` tiene un único camino
—dejar sus datos— y por eso no lleva ni menú ni enlaces a redes: cada salida en
una landing de pago es presupuesto que se escapa. Su único enlace que no es el
formulario es `tel:`. `/bio` es lo contrario: reparte tráfico a varios destinos,
porque quien llega de una bio está explorando, no viene empujado por un anuncio.

### Atribución

`QuoteForm` acepta `origen` y `retorno`, y lleva cuatro campos ocultos `utm_*`
que rellena un script leyendo la URL. Los UTM se guardan en `sessionStorage`
porque el visitante de un anuncio suele navegar dentro de la página antes de
abrir el formulario, y al primer enlace interno los parámetros desaparecen de la
barra: sin eso se perdería la atribución justo de los leads que más tardan en
decidirse.

`origen` y la campaña viajan al correo y al aviso de Telegram. El asunto del
correo lleva el origen delante para poder filtrar la bandeja.

En `/bio` el `?ref=fb` se lee **en el cliente**: la página es estática para que
salga del CDN al instante, y en build `Astro.url.searchParams` viene vacío.

### El campo `retorno`

Dice a qué página vuelve el visitante si la validación del servidor falla, para
no escupir a alguien de `/promo` en `/cotizar`. Como el valor llega del cliente,
se valida en `rutaInterna()`: solo rutas internas. Se rechazan `//evil.com`, la
variante con backslash y las URL absolutas — si no, el redirect serviría para
mandar tráfico a un dominio ajeno.

## Fotografía

Las fotos son de **Unsplash**, referenciadas por URL a su CDN (no se descargan
en el build: `auto=format` ya sirve WebP/AVIF y `w=` redimensiona). Están en
`IMAGES` y en `CATEGORIAS_UI` dentro de `src/consts.ts`, cada una con su `alt`
en español.

Para cambiar una foto: busca en unsplash.com, copia el ID del archivo
(`photo-1503694978374-8a2fa686963a`) y sustitúyelo — **y actualiza el `alt`**,
que debe describir lo que se ve.

## Qué falta / para cuando el negocio lo defina

- **Dominio**: `SITE.url` en `src/consts.ts` apunta a
  `https://www.imprentareverte.com`. Cámbialo si es otro, y también la línea
  `Sitemap:` de `public/robots.txt`.
- **Redes sociales**: `SOCIALS` tiene un enlace genérico a Facebook. Pon el
  perfil real o quita la entrada.
- **Horario**: `CONTACT.hoursText` y `CONTACT.hoursSpec` llevan un horario
  supuesto (L-V 9-19, Sáb 9-14). Confírmalo con el negocio — sale también en
  el JSON-LD, que es lo que lee Google.
- **Coordenadas**: `CONTACT.geo` está aproximado a Zona Centro. Ajústalo con la
  ubicación exacta del local.
- **Testimonios**: los de `TESTIMONIOS` son de muestra. Sustitúyelos por
  reseñas reales antes de publicar — van al JSON-LD como `Review`.
- **Correo**: el negocio solo dio teléfono. Si hay correo público, añádelo a
  `CONTACT` y al JSON-LD.

## Deploy

Vercel, con el adaptador `@astrojs/vercel` ya configurado. Las cabeceras de
seguridad y el CSP están en `vercel.json` — si añades un servicio externo
(analítica, chat), acuérdate de permitirlo ahí o lo bloqueará sin avisar.
