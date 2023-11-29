export function parseLargeNumber(string: string, radix: number) {
  return [...string.toString()].reduce(
    (r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)),
    0n,
  );
}

export function parseFloatToBase(string: string, from: number, to: number) {
  const parts = string.split(".");

  if (parts.length > 1) {
    const number = parseLargeNumber(parts[0], from).toString(to);

    const floatPart = parts[1].split("").reduce((acc, digit, index) => {
      return acc + parseInt(digit, from) / Math.pow(from, index + 1);
    }, 0);

    const float = floatPart.toString(to).split(".")[1] || "0";

    return `${number}.${float}`;
  }

  return parseLargeNumber(parts[0], from).toString(to).toUpperCase();
}
