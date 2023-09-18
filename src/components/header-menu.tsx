import type { ReactNode } from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface Item {
  children: ReactNode;
  href: string;
  label?: string;
}

const items: Item[] = [
  {
    children: <Github className="w-4" />,
    href: "https://github.com/yeecord/tools",
    label: "Github",
  },
];

export function HeaderMenu() {
  return items.map(({ label, ...item }, index) => (
    <Button key={index} asChild variant="ghost" size="sm">
      <a {...item} aria-label={label} />
    </Button>
  ));
}
