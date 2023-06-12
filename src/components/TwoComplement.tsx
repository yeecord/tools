import { FC, useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const TwoComplement = () => {
	const [source, setSource] = useState(0n);
	const sourceId = useId();

	return (
		<div className="space-y-4 mt-4">
			<h4 className="text-xl font-semibold tracking-tight">從</h4>
			<div className="grid w-full items-center gap-2">
				<Label htmlFor={sourceId}>來源 (十進位整數)</Label>
				<Input
					placeholder="1"
					onChange={(event) =>
						setSource(BigInt(event.target.value.trim()) || 0n)
					}
					value={source.toString()}
				/>
			</div>
			<h4 className="text-xl font-semibold tracking-tight">轉換為</h4>
			<Output value={source} label="二進位" />
			<Output value={(~source + 1n) & 0xffn} label="二補數 (八進位)" />
			<Output
				value={(~source + 1n) & 0xffffn}
				label="二補數 (十六進位)"
			/>
		</div>
	);
};

const Output: FC<{
	value: bigint | string;
	label: string;
}> = ({ value, label }) => {
	const id = useId();

	return (
		<div className="grid w-full items-center gap-2">
			<Label htmlFor={id}>{label}</Label>
			<Input
				readOnly
				value={typeof value === "bigint" ? value.toString(2) : value}
				onClick={(event) => event.currentTarget.select()}
			/>
		</div>
	);
};
