import {Box, Grid} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {CalculatorItem, CalculatorLogo, types} from "@components/calculatorItem"
import {useState} from "react"
import {useCalculate} from "../index"
import {NextSeo} from "next-seo"
import {SeoConfig} from "../../../next-seo.config"
import FromToNav from "@components/fromToNav"

const selectOptions = types.map(x => ({
	label: x.title,
	value: x.id,
}))

export default function SingleCalculator({ from, to }) {
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
				<FromToNav
					from={from}
					to={to}
					baseUrl="/calculator"
					options={selectOptions}
				/>
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
			if(from.id === to.id)
				continue
			
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