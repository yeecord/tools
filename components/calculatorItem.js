import {
	Flex,
	Grid,
	Heading,
	Image,
	Link,
	Input,
	Text,
	InputGroup,
	InputRightElement,
	CloseButton, Fade, useDisclosure
} from "@chakra-ui/react"
import NextLink from "next/link"

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
	const isInvalid = !regex?.test(value)

	return (
		<Grid
			rounded="md"
			borderWidth="1px"
			gap={[".25rem", ".5rem", ".75rem"]}
			px={[4, 6, 8]}
			py={[4, 4, 6]}
		>
			<Heading as="h3" fontSize={["md", "lg"]}>{title}</Heading>
			<Flex
				gap=".5rem"
				alignItems="center"
			>
				<Text fontSize={["md", "lg"]}>
					{prefix}
				</Text>
				<InputGroup>
					<Input
						autoComplete="off"
						autoCapitalize="off"
						autoCorrect="off"
						isInvalid={isInvalid}
						errorBorderColor="red.300"
						size="lg"
						fontSize={["lg", "xl"]}
						variant="flushed"
						onChange={calculate}
						value={value}
						placeholder="0"
					/>
					<Fade in={isInvalid}>
						<InputRightElement>
							<CloseButton color="red.400" size="lg" mb={-2.5}/>
						</InputRightElement>
					</Fade>
				</InputGroup>
			</Flex>
		</Grid>
	)
}

export function CalculatorLogo({ title }) {
	return (
		<Flex justifyContent={["center", "center", "start"]}>
			<NextLink href="/calculator" passHref>
				<Link mx={["auto", "unset"]}>
					<Flex
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
				</Link>
			</NextLink>
		</Flex>
	)
}