import {
	Box,
	Flex,
	Grid,
	Heading,
	Icon,
	Image,
	Link,
	LinkBox,
	LinkOverlay,
	SimpleGrid,
	Text
} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {NextSeo} from "next-seo"
import NextLink from "next/link"
import {HiSwitchHorizontal} from "react-icons/hi"
import {ArrowForwardIcon} from "@chakra-ui/icons"
import {types} from "@components/calculatorItem"

const calculators = []

for(const from of types) {
	for(const to of types) {
		if(from.id === to.id)
			continue
		
		calculators.push(
			<IndexItem
				title={`${from.chinese}轉${to.chinese}`}
				description={`幫助你將${from.chinese}的數字轉換為${to.chinese}`}
				href={`/calculator/${from.id}/${to.id}`}
				icon={HiSwitchHorizontal}
			/>
		)
	}
}

export default function Index() {
	return (
		<Box>
			<NextSeo/>
			<Nav/>
			<Grid gap={8} maxWidth={1024} mx="auto" px={4}>
				<Flex gap={4} alignItems="center">
					<Image src="https://yeecord.com/img/logo.png" w="48px" h="48px" rounded="full"/>
					<Heading as="h1">Yeecord 小工具</Heading>
				</Flex>
				<SimpleGrid columns={[1, 2, 3]} spacing={4}>
					<IndexItem
						title="進位計算機"
						description="輸入十進位、二進位、十六進位、八進位數字快速轉換"
						href="/calculator"
						icon={HiSwitchHorizontal}
					/>
					{calculators}
				</SimpleGrid>
			</Grid>
		</Box>
	)
}

function IndexItem({ title, description, icon, href }) {
	return (
		<LinkBox borderWidth="1px" rounded="md" px={5} py={4} display="grid" gap={4}>
			<NextLink href={href} passHref>
				<LinkOverlay>
					<Flex gap={2} alignItems="center">
						<Icon as={icon} w={6} h={5} color="orange.400"/>
						<Heading lineHeight="100%" size="md">{title}</Heading>
					</Flex>
				</LinkOverlay>
			</NextLink>
			<Text>{description}</Text>
			<NextLink href={href} passHref>
				<Link color="teal.400" fontWeight={600}>
					馬上使用
					<ArrowForwardIcon/>
				</Link>
			</NextLink>
		</LinkBox>
	)
}