import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, passthroughImageService } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://tools.yeecord.com",
  trailingSlash: "never",

  build: {
    format: "file",
  },

  integrations: [
    compress(),
    sitemap(),
    react(),
    robotsTxt({
      sitemapBaseFileName: "sitemap-index",
    }),
    mdx(),
  ],

  image: {
    service: passthroughImageService(),
  },

  vite: {
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
    plugins: [tailwindcss()],
  },

  output: "static",
  adapter: cloudflare({
    imageService: "passthrough",
  }),
});
