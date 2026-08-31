# Imprenta Reverte — sitio web

Sitio **informativo** de Imprenta Reverte (Ciudad Valles, SLP). No es tienda en
línea: no hay carrito, ni precios publicados, ni pagos. Sirve para que el
cliente consulte el catálogo y pida una cotización.

Construido con **Astro 5 + Tailwind 3 + TypeScript**, el mismo stack que
`../mariostintshop`.

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
    catalogo/index.astro    ← catálogo completo en una página
    catalogo/[slug].astro   ← una página por categoría (9)
    contacto.astro
    gracias.astro
    404.astro
    api/cotizar.ts          ← única ruta con servidor (Resend)
```

### El catálogo es la fuente única

`src/data/catalogo.ts` define las 9 categorías. **De ese archivo salen a la vez**
la rejilla de la home, las 9 páginas de categoría, el índice del catálogo, el
`<select>` del formulario, la validación del servidor, los enlaces del footer y
el `hasOfferCatalog` del JSON-LD.

Añadir una categoría ahí genera su página, su tarjeta y su opción de formulario
sin tocar nada más. Lo único que conviene añadirle es su bloque visual (foto,
resumen, descripción) en `CATEGORIAS_UI` dentro de `src/consts.ts`; si no lo
añades, la categoría igual funciona con valores por defecto.

El campo `noIncluye` no es decorativo: es lo que se muestra en el recuadro
"Esto va en otra categoría" y lo que evita que alguien pida una taza creyendo
que entra en textil.

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

Campos del formulario: nombre, teléfono, **ciudad** y categoría son
obligatorios; correo, cantidad, fecha y detalles son opcionales. La validación
se hace en el servidor, no solo en el navegador, y la categoría se comprueba
contra `SLUGS_CATALOGO`: un valor inventado se rechaza.

Antispam: campo trampa (`empresa_web`) oculto. Si viene lleno se responde con
éxito sin mandar nada, para no enseñarle al bot qué lo delató.

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
