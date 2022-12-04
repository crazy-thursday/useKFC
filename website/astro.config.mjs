import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { SITEDENO, SITERENDER } from './src/config'

// https://astro.build/config
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import deno from "@astrojs/deno";

const adapter = process.env.deno ? deno() : node({ mode: 'standalone' })
const site = process.env.deno ? SITEDENO : SITERENDER

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), sitemap({ customPages: [site] }), react(), tailwind(), vue()],
  output: "server",
  adapter,
  server: {
    port: 10086
  }
});