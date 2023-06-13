import { FC, useId } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Output: FC<{
	value: bigint | string;
	label: string;
}> = ({ value, label }) => {
	const id = useId();

	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				className="font-medium text-base font-mono max-w-xl"
				id={id}
				readOnly
				value={typeof value === "bigint" ? value.toString(2) : value}
				onClick={(event) => event.currentTarget.select()}
			/>
		</div>
	);
};
