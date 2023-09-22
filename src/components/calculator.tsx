import type { FC } from "react";
import type { CalculatorConfig } from "@/utils/calculator";
import { useCalculator } from "@/hooks/use-calculator.ts";
import { useId } from "react";
import { cn } from "@/utils/cn";
import { CalculatorSelect } from "@/components/calculator-select.tsx";
import { calculatorTypes } from "@/utils/calculator";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ArrowDown } from "lucide-react";

export const Calculator: FC<{
  from: CalculatorConfig;
  fromId: (typeof calculatorTypes)[number];
  to: CalculatorConfig;
  toId: (typeof calculatorTypes)[number];
}> = ({ from, to, fromId, toId }) => {
  const { fromValue, toValue, setFromValue, setToValue, fromValid, toValid } =
    useCalculator(from, to);

  return (
    <div className="space-y-8 mt-8">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <p className="text-xl font-semibold tracking-tight">從</p>
          <CalculatorSelect
            defaultValue={fromId}
            onValueChange={(value) =>
              value !== toId && (location.href = `/calculator/${value}/${toId}`)
            }
          />
        </div>
        <Item
          {...from}
          set={setFromValue}
          valid={fromValid}
          value={fromValue}
        />
      </div>
      <ArrowDown />
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <p className="text-xl font-semibold tracking-tight whitespace-nowrap">
            轉為
          </p>
          <CalculatorSelect
            defaultValue={toId}
            onValueChange={(value) =>
              value !== fromId &&
              (location.href = `/calculator/${fromId}/${value}`)
            }
          />
        </div>
        <Item {...to} set={setToValue} valid={toValid} value={toValue} />
      </div>
    </div>
  );
};

const Item: FC<
  CalculatorConfig & {
    value: string;
    set: (value: string) => void;
    valid: boolean;
  }
> = ({ title, set, valid, value }) => {
  const id = useId();

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={id}>{title}</Label>
      <Input
        id={id}
        placeholder="0"
        value={value}
        className={cn(
          "font-medium text-base border font-mono max-w-xl",
          !valid && "focus-visible:ring-0 border-red-700",
        )}
        onChange={(event) => set(event.target.value.trim())}
      />
    </div>
  );
};
