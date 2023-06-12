import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://tools.yeecord.com",
	integrations: [
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
		react(),
		compress(),
		sitemap(),
	],
	experimental: {
		assets: true,
	},
	image: {
		service: sharpImageService(),
	},
});
