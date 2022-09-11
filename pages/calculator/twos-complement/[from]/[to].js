import {Box, Grid} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {CalculatorItem, CalculatorLogo, types} from "@components/calculatorItem"
import {NextSeo} from "next-seo"
import {SeoConfig} from "../../../../next-seo.config"
import FromToNav from "@components/fromToNav"
import {useState} from "react"

const selectOptions = types.map(x => ({
	label: x.title,
	value: x.id,
}))

export default function TwosComplement({ from, to }) {
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
	
	return (
		<Box pb={4}>
			<NextSeo
				{...SeoConfig}
				title="線上二補數計算機"
			/>
			<Nav/>
			<Grid maxWidth={1024} alignItems="center" gap={6} px={4} mx="auto">
				<CalculatorLogo title="二補數計算機" isNew/>
				<FromToNav
					from={from}
					to={to}
					baseUrl="/calculator/twos-complement"
					options={selectOptions}
				/>
				<CalculatorItem {...fromData} calculate={getCalculate(fromData)}/>
				<CalculatorItem {...toData} calculate={getCalculate(toData)} readonly/>
			</Grid>
		</Box>
	)
}

export function useCalculate(updates) {
	return function getCalculate(base) {
		return function calculate(event) {
			if(event.target.value.length === 0)
				event.target.value = "0"
			
			if(event.target.value[1] === "-")
				event.target.value = event.target.value.slice(1)
			
			if(!base.regex.test(event.target.value) || event.target.value.endsWith("."))
				return base.update(event.target.value)
			
			const parsed = parseInt(event.target.value, base.base)
			
			for(const type of updates) {
				const result = type === base || parsed >= 0 ? parsed : ~parsed + 1
				
				if(type.base === 10)
					type.update(result.toLocaleString('fullwide', { useGrouping: false }))
				
				else type.update(result.toString(type.base))
			}
		}
	}
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