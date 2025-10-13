import type { CalculatorType } from "~/utils/calculator";
import type { TranslateFunction } from "~/utils/language";

export function createTitle(
  t: TranslateFunction,
  fromId: CalculatorType,
  toId: CalculatorType,
) {
  return t(
    "base-converter.title",
    t(`base-converter.${fromId}`),
    t(`base-converter.${toId}`),
  );
}
