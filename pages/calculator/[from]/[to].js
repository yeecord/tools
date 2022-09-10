import {Box, Button, Flex, Grid, Text} from "@chakra-ui/react"
import {Nav} from "@components/nav"
import {CalculatorItem, CalculatorLogo, types} from "@components/calculatorItem"
import {useRouter} from "next/router"
import {useState} from "react"
import {useCalculate} from "../index"
import {NextSeo} from "next-seo"
import {SeoConfig} from "../../../next-seo.config"
import {HiSwitchHorizontal} from "react-icons/hi"
import {Select} from "chakra-react-select"

const selectStyle = {
	container: (provided) => ({
		...provided,
		flexGrow: 1
	})
}

const selectOptions = types.map(x => ({
	label: x.title,
	value: x.id,
}))

export default function SingleCalculator({ from, to }) {
	const router = useRouter()
	
	const [fromVal, setFrom] = useState("0")
	const [toVal, setTo] = useState("0")
	
	const [loading, setLoading] = useState(false)
	
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
				<Flex gap={4} flexDirection={["column", "row"]}>
					<Grid
						flexGrow={1}
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
							<Select
								useBasicStyles
								chakraStyles={selectStyle}
								value={selectOptions.find(x => x.value === from)}
								isLoading={loading}
								isDisabled={loading}
								onChange={(event) => {
									if(event.value === to)
										return push(router, `/calculator/${to}/${from}`, setLoading)
									
									return push(router, `/calculator/${event.value}/${to}`, setLoading)
								}}
								options={selectOptions}
							/>
						</Flex>
						<Flex
							gap="1rem"
							alignItems="center"
						>
							<Text>到</Text>
							<Select
								useBasicStyles
								chakraStyles={selectStyle}
								value={selectOptions.find(x => x.value === to)}
								isLoading={loading}
								isDisabled={loading}
								onChange={(event) => {
									if(event.value === from)
										return push(router, `/calculator/${to}/${from}`, setLoading)
									
									return push(router, `/calculator/${from}/${event.value}`, setLoading)
								}}
								options={selectOptions}
							/>
						</Flex>
					</Grid>
					<Button rightIcon={<HiSwitchHorizontal/>} isLoading={loading}
						onClick={() => push(router, `/calculator/${to}/${from}`, setLoading)}>反轉</Button>
				</Flex>
				<CalculatorItem {...fromData} calculate={getCalculate(fromData)}/>
				<CalculatorItem {...toData} calculate={getCalculate(toData)}/>
			</Grid>
		</Box>
	)
}

async function push(router, path, setLoading) {
	setLoading(true)
	await router.push(path)
	setLoading(false)
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