import {Flex, Grid, Heading, Input, Text} from "@chakra-ui/react"

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