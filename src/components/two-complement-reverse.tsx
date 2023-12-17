import { useId, useMemo, useState } from "react";
import { parseLargeNumber } from "@/utils/parse";
import { Output } from "@/components/output.tsx";
import { getBitMask } from "@/utils/bits";
import { cn } from "@/utils/cn";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ArrowDown } from "lucide-react";
import { createTranslation, type TranslateFunction } from "@/utils/language.ts";

export const TwoComplementReverse = ({ lang }: { lang: string }) => {
  const t = createTranslation(lang);

  const [source, setSource] = useState("0");
  const sourceId = useId();

  const isValid = useMemo(() => /^[0-1]+$/.test(source), [source]);

  return (
    <div className="space-y-8 mt-8">
      <div className="space-y-4">
        <h4 className="text-xl font-semibold tracking-tight">
          {t("global.from")}
        </h4>
        <div className="grid gap-2">
          <Label htmlFor={sourceId}>{t("base-converter.bin")}</Label>
          <Input
            id={sourceId}
            className={cn(
              "font-medium text-base font-mono max-w-xl",
              !isValid && "border-red-700 focus-visible:ring-0",
            )}
            placeholder="00111011"
            defaultValue={source}
            onChange={(event) => setSource(event.target.value.trim())}
          />
        </div>
      </div>
      <ArrowDown />
      <div className="space-y-4">
        <h4 className="text-xl font-semibold tracking-tight">
          {t("global.to")}
        </h4>
        <Output
          value={isValid ? calculate(source) : ""}
          label={t("base-converter.dec")}
        />
      </div>
    </div>
  );
};

function calculate(source: string) {
  const numberString = source.slice(1);

  if (!numberString) return "0";

  const sign = source[0] === "1" ? -1n : 1n;

  return (
    ((~parseLargeNumber(numberString, 2) + 1n) &
      getBitMask(numberString.length)) *
    sign
  ).toString();
}
