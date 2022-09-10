import NextDocument, {Head, Html, Main, NextScript} from 'next/document'
import {ColorModeScript} from "@chakra-ui/react"

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="zh-Hant-Tw">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
					<link
						href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400&family=Readex+Pro:wght@600&family=Roboto+Mono&display=swap"
						rel="stylesheet"/>
				</Head>
				<body>
					<ColorModeScript initialColorMode="dark"/>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
	}
}