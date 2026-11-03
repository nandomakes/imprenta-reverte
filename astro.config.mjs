// @ts-check
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

/**
 * @astrojs/sitemap escribe sitemap-index.xml y sitemap-0.xml (el urlset).
 * /sitemap.xml es la ruta que se pide por convención y respondía 404.
 * Esta integración corre después y copia el urlset — las URLs reales, con
 * el apex de `site` — a ese nombre.
 */
function sitemapXml() {
  return {
    name: 'sitemap-xml',
    hooks: {
      'astro:build:done': async (/** @type {{ dir: URL }} */ { dir }) => {
        const out = fileURLToPath(dir);
        await copyFile(join(out, 'sitemap-0.xml'), join(out, 'sitemap.xml'));
      },
    },
  };
}

// Static by default — every catalog page is prerendered HTML. The Vercel
// adapter exists for exactly one route: /api/cotizar, which opts out of
// prerendering because it has to hold the Resend key server-side.
// El canónico es el apex (sin www). www.imprentareverte.com redirige con 301
// en vercel.json. SITE.url en src/consts.ts tiene que coincidir con `site`.
export default defineConfig({
  site: 'https://imprentareverte.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      // /gracias/ is a post-submit confirmation; /bio is a campaign landing
      // page marked noindex. Neither belongs in search.
      filter: (page) => !['/gracias', '/bio'].some((p) => page.includes(p)),
      // Sin lastmod: poner la fecha del build a TODAS las páginas le dice a
      // Google que todo cambió en cada despliegue, y acaba ignorando la señal.
    }),
    // Después de sitemap(), para copiar sitemap-0.xml cuando ya existe.
    sitemapXml(),
  ],
  build: { inlineStylesheets: 'auto' },
  /**
   * Sin esto, el POST del formulario moría en producción con
   * "Cross-site POST form submissions are forbidden".
   *
   * El motivo está en `validateHost()` de Astro: si `allowedDomains` viene
   * vacío, descarta el `Host` real de la petición y cae a "localhost". La
   * protección CSRF entonces compara el `Origin` que manda el navegador
   * (https://imprentareverte.com) contra https://localhost, no coinciden
   * y responde 403. En local nunca se ve porque ahí el host SÍ es localhost.
   *
   * Declarando los dominios reales, el host se acepta, el origen coincide y
   * la protección CSRF sigue funcionando — que es el punto: el fallo era un
   * falso positivo, no una protección de más que convenga apagar.
   */
  security: {
    allowedDomains: [
      { hostname: 'imprentareverte.com', protocol: 'https' },
      { hostname: '**.imprentareverte.com', protocol: 'https' },
      // Los despliegues de vista previa de Vercel, para poder probar el
      // formulario antes de que el cambio llegue al dominio real.
      { hostname: '**.vercel.app', protocol: 'https' },
    ],
  },
  // El catálogo pasó de 9 categorías agrupadas por objeto a 16 agrupadas por
  // técnica (ver src/data/catalogo.ts). Varias rutas viejas se dividieron en
  // dos o más nuevas; cada redirect apunta a la que se queda con la mayor
  // parte del contenido, para no perder un enlace que ya estuviera indexado.
  redirects: {
    '/catalogo/papeleria-comercial-corporativa/': '/catalogo/notas-formatos-negocio/',
    '/catalogo/publicidad-identidad-visual/': '/catalogo/impresion-comercial/',
    '/catalogo/impresion-gran-formato-senaletica/': '/catalogo/publicidad-exterior-gran-formato/',
    '/catalogo/impresion-textil-promocionales/': '/catalogo/dtf/',
    '/catalogo/grabado-laser-sublimacion-rigidos/': '/catalogo/grabado-laser/',
    '/catalogo/sellos-articulos-oficina/': '/catalogo/sellos/',
    '/catalogo/impresion-eventos/': '/catalogo/eventos-invitaciones/',
  },
});
