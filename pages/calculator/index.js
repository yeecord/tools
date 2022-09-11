import {Box, Divider, Grid, Heading, Link, ListItem, Text, UnorderedList} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {NextSeo} from "next-seo"
import {CalculatorItem, CalculatorLogo, types} from "@components/calculatorItem"
import {useState} from "react"
import {SeoConfig} from "../../next-seo.config"

export default function Index() {
	const updates = types.map((type) => {
		const [value, update] = useState('0')
		
		return {
			...type,
			value,
			update
		}
	})
	
	const getCalculate = useCalculate(updates)
	
	return (
		<Box pb={4}>
			<NextSeo {...SeoConfig}/>
			<Nav/>
			<Grid
				maxWidth={1280}
				mx="auto"
				px={4}
				gap={8}
			>
				<CalculatorLogo/>
				<Text mt={-4} fontSize={["lg", "xl"]} textAlign={["center", "center", "left"]}>輸入十進位、二進位、十六進位、八進位數字快速轉換</Text>
				<Grid
					templateColumns={["1fr", "1fr", "1fr 1fr"]}
					gap={6}
				>
					{updates.map(t => <CalculatorItem {...t} calculate={getCalculate(t)} key={t.title}/>)}
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
				<Link href="https://zh.wikipedia.org/wiki/进位制" isExternal>➤ https://zh.wikipedia.org/wiki/进位制</Link>
			</Grid>
		</Box>
	)
}

export function useCalculate(updates) {
	return function getCalculate(base) {
		return function calculate(event) {
			if(event.target.value.length === 0)
				event.target.value = "0"
			
			if(!base.regex.test(event.target.value) || event.target.value.endsWith("."))
				return base.update(event.target.value)
			
			const parsed = parseFloat(event.target.value, base.base)
			
			for(const type of updates) {
				if(type.base === 10)
					type.update(parsed.toLocaleString('fullwide', { useGrouping: false }))
				
				else type.update(parsed.toString(type.base))
			}
		}
	}
}

function parseFloat(str, radix) {
	const parts = str.split(".")
	
	if (parts.length > 1)
		return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length)
	
	return parseInt(parts[0], radix)
}