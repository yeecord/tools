import type { FC } from "react";
import type { CalculatorType } from "@/utils/calculator";
import { useCalculator } from "@/hooks/use-calculator.ts";
import { cn } from "@/utils/cn";
import { calculatorConfig, calculatorTypes } from "@/utils/calculator";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { createTitle } from "@/utils/title.ts";

export const Calculator: FC<{
  defaultFromId: CalculatorType;
  defaultToId: CalculatorType;
}> = ({ defaultFromId, defaultToId }) => {
  const {
    toValue,
    setFromValue,
    fromType,
    toType,
    fromValid,
    setFromType,
    setToType,
  } = useCalculator(defaultFromId, defaultToId);

  return (
    <div className="max-w-screen-md md:mx-auto flex flex-col gap-2">
      <div className="flex justify-center w-full px-2">
        <TabGroup
          disabled={toType}
          setValue={(value) => {
            setFromType(value);

            history.pushState({}, "", `/calculator/${value}/${toType}`);
            document.title = createTitle(value, toType);
          }}
          current={fromType}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setFromType(toType);
            setToType(fromType);

            history.pushState({}, "", `/calculator/${toType}/${fromType}`);
            document.title = createTitle(toType, fromType);
          }}
        >
          <ArrowRightLeft className="w-4 text-primary/75" />
        </Button>
        <TabGroup
          disabled={fromType}
          setValue={(value) => {
            setToType(value);

            history.pushState({}, "", `/calculator/${fromType}/${value}`);
            document.title = createTitle(fromType, value);
          }}
          current={toType}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Textarea
          className={cn(
            "whitespace-pre-wrap inline-block text-start break-words break-all text-xl bg-secondary/25 resize-none focus-visible:ring-0 !ring-offset-0",
            !fromValid &&
              "border-destructive outline-destructive ring-destructive",
          )}
          onLoad={(event) => (event.currentTarget.innerHTML = "0")}
          onChange={(event) => {
            event.currentTarget.style.height = "";
            event.currentTarget.style.height =
              event.currentTarget.scrollHeight + "px";

            setFromValue(event.currentTarget.value);
          }}
          rows={3}
          defaultValue={0}
        />
        <Textarea
          readOnly
          className="whitespace-pre-wrap inline-block text-start break-words break-all text-xl bg-secondary/50 resize-none border-none"
          value={toValue}
        />
      </div>
    </div>
  );
};

const TabGroup: FC<{
  setValue: (value: CalculatorType) => void;
  current?: CalculatorType;
  disabled?: CalculatorType;
}> = ({ current, setValue, disabled }) => {
  return (
    <div className="w-full">
      <ul className="md:flex hidden list-none m-0 [&>li]:m-0 flex-grow md:justify-start justify-center">
        {calculatorTypes.map((type) => (
          <TabSelect
            key={type}
            name={`${calculatorConfig[type].title}進位`}
            active={type === current}
            onClick={() => setValue(type)}
            disabled={disabled === type}
          />
        ))}
      </ul>
      <Select
        value={current}
        onValueChange={(value) => setValue(value as CalculatorType)}
      >
        <SelectTrigger className="md:hidden focus:ring-offset-0 border-none gap-2 focus:ring-0 focus:outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {calculatorTypes.map((type) => (
            <SelectItem value={type} key={type} disabled={type === disabled}>
              {calculatorConfig[type].title}進位
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const TabSelect: FC<{
  name: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}> = ({ name, onClick, active, disabled }) => (
  <li>
    <Button
      disabled={disabled}
      variant="ghost"
      className={cn(
        "border-b-2 border-transparent md:block hidden",
        active &&
          "md:border-primary md:rounded-b-none block border-transparent",
      )}
      onClick={onClick}
    >
      {name}
    </Button>
  </li>
);
