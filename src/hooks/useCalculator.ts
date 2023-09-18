import { useEffect, useMemo, useState } from "react";
import type { CalculatorConfig } from "@/utils/calculator";
import { parseFloatToBase } from "@/utils/parse";

export function useCalculator(from: CalculatorConfig, to: CalculatorConfig) {
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");

  const fromValid = useMemo(() => from.regex.test(fromValue), [fromValue]);
  const toValid = useMemo(() => to.regex.test(toValue), [toValue]);

  useEffect(() => {
    if (fromValid) setToValue(parseFloatToBase(fromValue, from.base, to.base));
  }, [fromValid, fromValue]);

  useEffect(() => {
    if (toValid) setFromValue(parseFloatToBase(toValue, to.base, from.base));
  }, [toValid, toValue]);

  return {
    fromValue,
    toValue,
    fromValid,
    toValid,
    setFromValue,
    setToValue,
  };
}
