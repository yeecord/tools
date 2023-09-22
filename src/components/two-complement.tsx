import { useId, useState } from "react";
import { Output } from "@/components/output.tsx";
import { getBitMask } from "@/utils/bits";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ArrowDown } from "lucide-react";

export const TwoComplement = () => {
  const [source, setSource] = useState(0n);
  const [bits, setBits] = useState(8);
  const sourceId = useId();
  const bitsId = useId();

  const overflow = source > getBitMask(bits - 1);

  return (
    <div className="space-y-8 mt-8">
      <div className="space-y-4">
        <h4 className="text-xl font-semibold tracking-tight">從</h4>
        <div className="grid gap-2">
          <Label htmlFor={sourceId}>來源 (十進位整數)</Label>
          <Input
            id={sourceId}
            className="font-medium text-base border font-mono max-w-xl"
            placeholder="1"
            defaultValue={source.toString()}
            onChange={(event) => {
              try {
                setSource(BigInt(event.target.value.trim()) || 0n);
              } catch (e) {}
            }}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={bitsId}>位元數</Label>
          <Input
            type="number"
            id={bitsId}
            min={1}
            className="font-mono max-w-xl"
            defaultValue={bits}
            onChange={(event) => {
              const number = parseInt(event.target.value);

              if (number) return setBits(number);
            }}
          />
        </div>
      </div>
      <ArrowDown />
      <div className="space-y-4">
        <h4 className="text-xl font-semibold tracking-tight">轉換為</h4>
        <Output value={source} label="二進位" />
        <Output
          value={overflow ? "溢位" : calculate(source, bits)}
          label={`二補數 (${bits} 進位)`}
        />
      </div>
    </div>
  );
};

function calculate(source: bigint, bits: number) {
  const sign = Number(source < 0);

  const number = ((~source + 1n) & getBitMask(bits - 1))
    .toString(2)
    .padStart(bits - 1, "0");

  return `${sign}${number}`;
}
