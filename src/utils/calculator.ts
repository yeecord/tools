export const calculatorTypes = ["dec", "hex", "oct", "bin"] as const;

export type CalculatorType = (typeof calculatorTypes)[number];

export interface CalculatorConfig {
  base: number;
  regex: RegExp;
}

export const calculatorConfig: Record<CalculatorType, CalculatorConfig> = {
  dec: {
    base: 10,
    regex: /^\d+(\.\d+)?$/,
  },
  hex: {
    base: 16,
    regex: /^[0-9a-fA-F]+(\.[0-9a-fA-F]+)?$/,
  },
  oct: {
    base: 8,
    regex: /^[0-7]+(\.[0-7]+)?$/,
  },
  bin: {
    base: 2,
    regex: /^[01]+(\.[01]+)?$/,
  },
};
