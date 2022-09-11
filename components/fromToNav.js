import {Button, Flex, Grid, Text} from "@chakra-ui/react"
import {Select} from "chakra-react-select"
import {HiSwitchHorizontal} from "react-icons/hi"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

const selectStyle = {
	container: (provided) => ({
		...provided,
		flexGrow: 1
	})
}

export default function FromToNav({ from, to, baseUrl, options }) {
	const router = useRouter()
	
	const [loading, setLoading] = useState(true)
	
	useEffect(() => setLoading(false), [])
	
	return (
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
						value={options.find(x => x.value === from)}
						isLoading={loading}
						isDisabled={loading}
						onChange={(event) => {
							if(event.value === to)
								return push(router, `${baseUrl}/${to}/${from}`, setLoading)
							
							return push(router, `${baseUrl}/${event.value}/${to}`, setLoading)
						}}
						options={options}
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
						value={options.find(x => x.value === to)}
						isLoading={loading}
						isDisabled={loading}
						onChange={(event) => {
							if(event.value === from)
								return push(router, `${baseUrl}/${to}/${from}`, setLoading)
							
							return push(router, `${baseUrl}/${from}/${event.value}`, setLoading)
						}}
						options={options}
					/>
				</Flex>
			</Grid>
			<Button rightIcon={<HiSwitchHorizontal/>} isLoading={loading}
					onClick={() => push(router, `${baseUrl}/${to}/${from}`, setLoading)}>反轉</Button>
		</Flex>
	)
}

async function push(router, path, setLoading) {
	setLoading(true)
	await router.push(path)
	setLoading(false)
}