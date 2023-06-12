import { defineConfig, sharpImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

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
