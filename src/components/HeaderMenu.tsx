import type { ReactNode } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Github } from "lucide-react";

interface Item {
	children: ReactNode;
	href: string;
}

const items: Item[] = [
	{
		children: <Github size={18} />,
		href: "https://github.com/yeecord/tools",
	},
];

export function HeaderMenu() {
	return (
		<NavigationMenu className="md:block hidden">
			<NavigationMenuList>
				{items.map((item, index) => (
					<NavigationMenuItem key={index}>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
							{...item}
						/>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
