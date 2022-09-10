import '@styles/globals.scss'
import {ChakraProvider, extendTheme, withDefaultColorScheme} from "@chakra-ui/react"

const theme = extendTheme(withDefaultColorScheme({
	colorScheme: "teal"
}))

function MyApp({Component, pageProps}) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
