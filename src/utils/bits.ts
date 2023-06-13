export function getBitMask(bits: number) {
	return (1n << BigInt(bits)) - 1n;
}
