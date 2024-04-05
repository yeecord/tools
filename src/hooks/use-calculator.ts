import {
  calculatorConfig,
  type CalculatorConfig,
  type CalculatorType,
} from "@/utils/calculator";
import { parseFloatToBase } from "@/utils/parse";
import { useEffect, useMemo, useState } from "react";

export function useCalculator(
  defaultFromType: CalculatorType,
  defaultToType: CalculatorType,
) {
  const [fromType, setFromType] = useState(defaultFromType);
  const [toType, setToType] = useState(defaultToType);
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");

  const calculate = (
    value: string,
    from: CalculatorConfig,
    to: CalculatorConfig,
  ) => parseFloatToBase(value, from.base, to.base);

  const fromValid = useMemo(
    () => calculatorConfig[fromType].regex.test(fromValue),
    [fromType, fromValue],
  );

  useEffect(() => {
    if (fromValid)
      setToValue(
        calculate(
          fromValue,
          calculatorConfig[fromType],
          calculatorConfig[toType],
        ),
      );
  }, [fromType, toType, fromValue]);

  return {
    setFromType,
    setToType,
    fromType,
    toType,
    fromValue,
    toValue,
    fromValid,
    setFromValue,
    setToValue,
  };
}
