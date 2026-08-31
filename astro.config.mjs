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
      // /gracias/ is a post-submit confirmation; it has no business in search.
      filter: (page) => !page.includes('/gracias'),
      serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
