import type { FC, PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { ChevronsUpDown } from "lucide-react";

export const Branding: FC<PropsWithChildren> = ({ children }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex gap-2 items-center mr-2">
      {children}
      <ChevronsUpDown className="w-3 text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <a href="/">回首頁</a>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <a href="https://yeecord.com/" target="_blank">
          YEE式機器龍
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
