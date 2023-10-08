import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { calculatorConfig } from "@/utils/calculator.ts";
import type { FC } from "react";
import type { SelectProps } from "@radix-ui/react-select";

export const CalculatorSelect: FC<SelectProps> = (props) => (
  <Select {...props}>
    <SelectTrigger className="md:w-40" aria-label="選擇進制位">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(calculatorConfig).map(([key, value]) => (
        <SelectItem value={key} key={key}>
          {value.title}進位
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
