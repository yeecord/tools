export const calculatorTypes = ["dec", "hex", "oct", "bin"] as const;

export interface CalculatorConfig {
  title: string;
  base: number;
  regex: RegExp;
}

export const calculatorConfig: Record<
  (typeof calculatorTypes)[number],
  CalculatorConfig
> = {
  dec: {
    title: "十",
    base: 10,
    regex: /^\d+(\.\d+)?$/,
  },
  hex: {
    title: "十六",
    base: 16,
    regex: /^[0-9a-fA-F]+(\.[0-9a-fA-F]+)?$/,
  },
  oct: {
    title: "八",
    base: 8,
    regex: /^[0-7]+(.[0-7]+)?$/,
  },
  bin: {
    title: "二",
    base: 2,
    regex: /^[0-1]+(.[0-1]+)?$/,
  },
};
