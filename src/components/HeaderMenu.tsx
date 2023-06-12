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
	label?: string;
}

const items: Item[] = [
	{
		children: <Github size={18} />,
		href: "https://github.com/yeecord/tools",
		label: "Github",
	},
];

export function HeaderMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{items.map(({ label, ...item }, index) => (
					<NavigationMenuItem key={index}>
						<NavigationMenuLink
							className={navigationMenuTriggerStyle()}
							aria-label={label}
							{...item}
						/>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
