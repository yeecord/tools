import { calculatorConfig, type CalculatorType } from "@/utils/calculator.ts";

export function createTitle(fromId: CalculatorType, toId: CalculatorType) {
  return `即時${calculatorConfig[fromId].title}進制轉${calculatorConfig[toId].title}進制轉換器`;
}
