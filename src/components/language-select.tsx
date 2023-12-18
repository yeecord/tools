import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/utils/language";
import { Button } from "@/components/ui/button.tsx";
import { Languages } from "lucide-react";

export const LanguageSelect: FC<{
  code: string;
  path: string;
}> = ({ code, path }) => {
  if (path.endsWith("/")) path = path.slice(0, -1);

  return (
    <Select
      value={code}
      onValueChange={(lang) => (location.href = `/${lang}${path}`)}
    >
      <SelectTrigger
        className="w-fit mr-2.5"
        aria-label="Language select for desktop"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([key, value]) => (
          <SelectItem key={key} value={key}>
            {value.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
