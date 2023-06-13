import logoAsset from "@/assets/logo.png";
import { getImage } from "astro:assets";

export const logo = await getImage({
	src: logoAsset,
});
