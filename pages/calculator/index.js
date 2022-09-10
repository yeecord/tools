import {Box, Divider, Flex, Grid, Heading, Image, Link, ListItem, Text, UnorderedList} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {NextSeo} from "next-seo"
import {CalculatorItem} from "@components/calculatorItem"
import {useState} from "react"
import Head from "next/head"

export default function Index() {
	const [dec, setDec] = useState('0')
	const [hex, setHex] = useState('0')
	const [bin, setBin] = useState('0')
	const [oct, setOct] = useState('0')
	
	const types = [
		{
			base: 10,
			value: dec,
			update: setDec,
			regex: /^\d+\.?\d*$/,
			title: "十進位 (Decimal)",
		},
		{
			base: 16,
			value: hex,
			update: setHex,
			prefix: "0x",
			title: "十六進位 (Hexadecimal)",
			regex: /^[0-9a-f]+\.?[0-9a-f]*$/i,
		},
		{
			base: 2,
			value: bin,
			update: setBin,
			prefix: "0b",
			title: "二進位 (Binary)",
			regex: /^[0-1]+\.?[0-1]*$/,
		},
		{
			base: 8,
			value: oct,
			update: setOct,
			title: "八進位 (Octal)",
			regex: /^[0-7]+\.?[0-7]*$/,
		}
	]
	
	function getCalculate(base) {
		return function calculate(event) {
			if(event.target.value.length === 0)
				event.target.value = "0"
			
			if(!base.regex.test(event.target.value) || event.target.value.endsWith("."))
				return base.update(event.target.value)
			
			for(const type of types)
				type.update(parseFloat(event.target.value, base.base).toString(type.base))
		}
	}
	
	return (
		<Box>
			<Head>
				<meta name="color-scheme" content="dark"/>
			</Head>
			<NextSeo
				title="線上進位計算機 - 即時十進位轉二進位、八進位轉十六進位、二進位轉十六進位"
				description="即時將十進位轉換為二進位、八進位轉十六進位、二進位轉十六進位等等進位制"
				canonical="https://tools.yeecord.com/calculator"
				openGraph={{
					images: [{
						url: "https://tools.yeecord.com/img/calculator/favicon.png",
						width: 128,
						height: 128,
						alt: "進位計算機",
						type: "image/png"
					}]
				}}
				additionalLinkTags={[
					{
						rel: "icon",
						href: "/img/calculator/favicon.png"
					}
				]}
			/>
			<Nav/>
			<Grid
				maxWidth={1280}
				margin="auto"
				px={4}
				gap={8}
			>
				<Flex
					w="full"
					justifyContent={["center", "center", "start"]}
					alignItems="center"
					gap=".75rem"
				>
					<Image
						src="/img/calculator/favicon.png"
						width="2.5rem"
						height="2.5rem"
						alt="進位計算機"
					/>
					<Heading
						as="h1"
						fontWeight="600"
					>
						進位計算機
					</Heading>
				</Flex>
				<Text mt={-4} fontSize={["lg", "xl"]} textAlign={["center", "center", "left"]}>輸入十進位、二進位、十六進位、八進位數字快速轉換</Text>
				<Grid
					templateColumns={["1fr", "1fr", "1fr 1fr"]}
					gap={6}
				>
					{types.map(t => <CalculatorItem {...t} calculate={getCalculate(t)} key={t.title}/>)}
				</Grid>
				<Divider/>
				<Heading as="h2" borderBottom="3px solid #0090ff" mr="auto">
					什麼是
					<Text as="span" color="deepskyblue">
						進位制
					</Text>
					？
				</Heading>
				<Text fontSize="lg">
					進位制是一種記數方法，也稱進位計數法，利用這種記數法可以使用有限的數字符號來表示所有的數值
				</Text>
				<UnorderedList spacing={4} fontSize="lg">
					<ListItem>
						一種進位制中可以使用的數字符號的數目稱為這種進位制的基數，若一個進位制的基數為 N，則可稱之為 N 進位制，即表示數值時滿 N 進一位
					</ListItem>
					<ListItem>
						運算則是在程式中對二進位制數的一元和二元運算操作
					</ListItem>
					<ListItem>
						在生活中最常用的是十進位制，使用 10 個阿拉伯數字 0 到 9 進行記數
					</ListItem>
					<ListItem>
						在電子計算機領域，內部使用的是二進位制，電路的狀態通過 0 和 1 表示來實現記數。八進位制和十六進位制計算機領域也較為常用，尤其十六進位制
					</ListItem>
				</UnorderedList>
				<Link pb={[4, 0]} href="https://zh.wikipedia.org/wiki/进位制" target="_blank" rel="noreferrer">➤ https://zh.wikipedia.org/wiki/进位制</Link>
			</Grid>
		</Box>
	)
}

function parseFloat(str, radix) {
	const parts = str.split(".")
	
	if (parts.length > 1)
		return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)
	
	return parseInt(parts[0], radix)
}