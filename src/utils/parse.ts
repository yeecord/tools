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

    const float = (
      BigInt(parseInt(parts[1], from)) / BigInt(Math.pow(from, parts[1].length))
    )
      .toString(to)
      .split(".")[1];

    return `${number}.${float}`;
  }

  return parseLargeNumber(parts[0], from).toString(to).toUpperCase();
}
