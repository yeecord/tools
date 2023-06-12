import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://tools.yeecord.com",
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		compress(),
		sitemap(),
		react(),
		robotsTxt(),
		AstroPWA(),
	],
	experimental: {
		assets: true,
	},
	image: {
		service: sharpImageService(),
	},
	vite: {
		ssr: {
			noExternal: ["@radix-ui/*"],
		},
	},
});
