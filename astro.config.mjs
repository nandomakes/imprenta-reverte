// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Static by default — every catalog page is prerendered HTML. The Vercel
// adapter exists for exactly one route: /api/cotizar, which opts out of
// prerendering because it has to hold the Resend key server-side.
export default defineConfig({
  site: 'https://www.imprentareverte.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      // /gracias/ is a post-submit confirmation; /bio is a campaign landing
      // page marked noindex. Neither belongs in search.
      filter: (page) => !['/gracias', '/bio'].some((p) => page.includes(p)),
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
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
