import {Flex, Grid, Heading, Image, Input, Text} from "@chakra-ui/react"
import Link from "next/link"

export const types = [
	{
		id: "dec",
		base: 10,
		regex: /^\d+\.?\d*$/,
		title: "十進位 (Decimal)",
		chinese: "十進位"
	},
	{
		id: "hex",
		base: 16,
		regex: /^[0-9a-f]+\.?[0-9a-f]*$/i,
		prefix: "0x",
		title: "十六進位 (Hexadecimal)",
		chinese: "十六進位"
	},
	{
		id: "bin",
		base: 2,
		regex: /^[0-1]+\.?[0-1]*$/,
		prefix: "0b",
		title: "二進位 (Binary)",
		chinese: "二進位"
	},
	{
		id: "oct",
		base: 8,
		regex: /^[0-7]+\.?[0-7]*$/,
		title: "八進位 (Octal)",
		chinese: "八進位"
	}
]

export function CalculatorItem({ title, prefix, value, calculate, regex }) {
	return (
		<Grid
			backgroundColor="gray.700"
			borderRadius=".75rem"
			gap={[".25rem", ".5rem", ".75rem"]}
			px={[4, 6, 8]}
			py={[4, 4, 6]}
		>
			<Heading as="h3" fontSize={["1.25rem", "1.5rem"]}>{title}</Heading>
			<Flex
				gap=".5rem"
				alignItems="center"
			>
				<Text fontSize="lg">
					{prefix}
				</Text>
				<Input
					isInvalid={!regex?.test(value)}
					errorBorderColor="red.300"
					size="lg"
					fontSize="xl"
					variant="flushed"
					onChange={calculate}
					value={value}
				/>
			</Flex>
		</Grid>
	)
}

export function CalculatorLogo({ title }) {
	return (
		<Link href="/calculator">
			<a>
				<Flex
					w="full"
					justifyContent={["center", "center", "start"]}
					alignItems="center"
					gap=".75rem"
				>
					<Image
						src="/img/calculator/favicon.png"
						width={["2rem", "2.5rem"]}
						height={["2rem", "2.5rem"]}
						alt="進位計算機"
					/>
					<Heading
						as="h1"
						fontSize={["2xl", "3xl"]}
						fontWeight="600"
					>
						{title || "進位計算機"}
					</Heading>
				</Flex>
			</a>
		</Link>
	)
}