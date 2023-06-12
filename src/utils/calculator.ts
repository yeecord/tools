export const calculatorTypes = ["dec", "hex", "oct", "bin"] as const;

export interface CalculatorConfig {
	title: string;
	base: number;
}

export const calculatorConfig: Record<
	(typeof calculatorTypes)[number],
	CalculatorConfig
> = {
	dec: {
		title: "十進位",
		base: 10,
	},
	hex: {
		title: "十六進位",
		base: 16,
	},
	oct: {
		title: "八進位",
		base: 8,
	},
	bin: {
		title: "二進位",
		base: 2,
	},
};
