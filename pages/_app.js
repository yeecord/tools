import '@styles/globals.scss'
import {ChakraProvider, extendTheme, withDefaultColorScheme} from "@chakra-ui/react"
import Head from "next/head"

const theme = extendTheme(withDefaultColorScheme({
	colorScheme: "teal"
}))

function MyApp({Component, pageProps}) {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
				/>
				<meta name="application-name" content="Yeecord 小工具" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<meta name="apple-mobile-web-app-title" content="Yeecord 小工具" />
				<meta name="description" content="實用的數學小工具，包含進位計算機等簡便小工具，以及乾淨的操作介面" />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-TileColor" content="#1A202C" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#1A202C" />
				
				<link rel="apple-touch-icon" sizes="128x128" href="https://yeecord.com/img/logo.png" />
				<link rel="apple-touch-icon" sizes="512x512" href="https://yeecord.com/img/logo_512x512.png" />
				<link rel="shortcut icon" href="https://yeecord.com/img/logo.png" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="nightmode" content="enable"/>
			</Head>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
