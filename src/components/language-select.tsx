import type { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { languages } from "~/utils/language";

export const LanguageSelect: FC<{
  code: string;
  path: string;
  disabled?: boolean;
}> = ({ code, path, disabled }) => {
  if (path.endsWith("/")) path = path.slice(0, -1);

  return (
    <Select
      value={code}
      disabled={disabled}
      onValueChange={(lang) => {
        location.href = `/${lang}${path}`;
      }}
    >
      <SelectTrigger
        className="w-fit mr-2.5"
        aria-label="Language select for desktop"
      >
        <SelectValue defaultValue={code} />
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
