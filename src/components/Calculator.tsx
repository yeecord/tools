import type { FC } from "react";
import type { CalculatorConfig } from "@/utils/calculator";
import { useCalculator } from "@/hooks/useCalculator";
import { useId } from "react";
import { cn } from "@/utils/cn";

export const Calculator: FC<{
	from: CalculatorConfig;
	to: CalculatorConfig;
}> = ({ from, to }) => {
	const { fromValue, toValue, setFromValue, setToValue, fromValid, toValid } =
		useCalculator(from, to);

	return (
		<div className="space-y-8 mt-8">
			<div className="space-y-4">
				<h4 className="text-xl font-semibold tracking-tight">從</h4>
				<Item
					{...from}
					set={setFromValue}
					valid={fromValid}
					value={fromValue}
				/>
			</div>
			<div className="space-y-4">
				<h4 className="text-xl font-semibold tracking-tight">轉為</h4>
				<Item
					{...to}
					set={setToValue}
					valid={toValid}
					value={toValue}
				/>
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
			<label htmlFor={id}>{title}</label>
			<input
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
