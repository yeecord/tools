import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";
import robotsTxt from "astro-robots-txt";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://tools.yeecord.com",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
    sitemap(),
    react(),
    robotsTxt(),
    AstroPWA(),
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
