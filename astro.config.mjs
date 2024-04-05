import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import compress from "@playform/compress";
import robotsTxt from "astro-robots-txt";
import { defineConfig, sharpImageService } from "astro/config";

export default defineConfig({
  site: "https://tools.yeecord.com",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
    sitemap(),
    react(),
    robotsTxt({
      sitemapBaseFileName: "sitemap-index",
    }),
    mdx(),
  ],
  image: {
    service: sharpImageService(),
  },
  vite: {
    ssr: {
      noExternal: ["@radix-ui/*"],
    },
  },
});
