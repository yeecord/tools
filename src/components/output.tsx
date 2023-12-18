import { type FC, useId } from "react";
import { Input } from "@/components/ui/input";

export const Output: FC<{
  value: bigint | string;
  label: string;
}> = ({ value, label }) => {
  const id = useId();

  return (
    <div className="grid gap-2">
      <label htmlFor={id}>{label}</label>
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
