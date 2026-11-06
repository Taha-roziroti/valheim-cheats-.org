import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://valheimcheats.org',
  trailingSlash: 'always',
  redirects: {
    '/products/dota-2-cheats/lite/': '/products/dota-2-cheats/',
    '/products/dota-2-cheats/pro/': '/products/dota-2-cheats/',
    '/cheats/': '/products/dota-2-cheats/',
    '/cheats/lite/': '/products/dota-2-cheats/',
    '/cheats/pro/': '/products/dota-2-cheats/',
    '/cheats/elite/': '/products/dota-2-cheats/elite/',
    '/cheats/compare/': '/blog/dota-2-lite-vs-pro/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
      namespaces: {
        xhtml: false,
        news: false,
        image: true,
        video: true,
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
