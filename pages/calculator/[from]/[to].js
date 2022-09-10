import {Box, Flex, Grid, Select, Text} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {CalculatorItem, CalculatorLogo, types} from "@components/calculatorItem"
import {useRouter} from "next/router"
import {useState} from "react"
import {useCalculate} from "../index"
import {NextSeo} from "next-seo"
import {SeoConfig} from "../../../next-seo.config"

export default function SingleCalculator({ from, to }) {
	const router = useRouter()
	
	const [fromVal, setFrom] = useState("0")
	const [toVal, setTo] = useState("0")
	
	const fromData = {
		...types.find(x => x.id === from),
		value: fromVal,
		update: setFrom
	}
	
	const toData = {
		...types.find(x => x.id === to),
		value: toVal,
		update: setTo
	}
	
	const getCalculate = useCalculate([fromData, toData])
	
	const title = `${fromData.chinese}轉${toData.chinese}計算機`
	
	return (
		<Box>
			<NextSeo
				{...SeoConfig}
				title={title}
				description={`在線上使用瀏覽器將${title}`}
				canonical={`https://tools.yeecord.com/calculator/${from}/${to}`}
			/>
			<Nav/>
			<Grid
				mx="auto"
				alignItems="center"
				maxWidth={1024}
				gap={6}
				px={4}
			>
				<CalculatorLogo title={title}/>
				<Grid
					fontSize="xl"
					gap="1rem"
					alignItems="center"
					templateColumns={["1fr", "1fr 1fr"]}
				>
					<Flex
						alignItems="center"
						gap="1rem"
					>
						<Text>從</Text>
						<Select defaultValue={from} onChange={(event) => {
							router.push(`/calculator/${event.target.value}/${to}`)
						}}>
							{types.map(x => <option value={x.id} key={x.id} disabled={x.id === to}>{x.title}</option>)}
						</Select>
					</Flex>
					<Flex
						gap="1rem"
						alignItems="center"
					>
						<Text>到</Text>
						<Select defaultValue={to} onChange={(event) => {
							router.push(`/calculator/${from}/${event.target.value}`)
						}}>
							{types.map(x => <option value={x.id} key={x.id} disabled={x.id === from}>{x.title}</option>)}
						</Select>
					</Flex>
				</Grid>
				<CalculatorItem {...fromData} calculate={getCalculate(fromData)}/>
				<CalculatorItem {...toData} calculate={getCalculate(toData)}/>
			</Grid>
		</Box>
	)
}

export async function getStaticPaths() {
	const paths = []
	
	for(const from of types) {
		for(const to of types) {
			paths.push({
				params: {
					from: from.id, to: to.id
				}
			})
		}
	}
	
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	return {
		props: params
	}
}