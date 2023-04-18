import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { ChakraProvider } from "@chakra-ui/react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Head from "next/head"

import "@fontsource/work-sans/latin.css"
import "@fontsource/inter/latin.css"

import theme from "@/utils/theme"
import { api } from "@/utils/api"

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<Head>
				<title>Jobby</title>
				<meta name="description" content="Finding jobs made easy" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ChakraProvider theme={theme}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</ChakraProvider>

			<ReactQueryDevtools />
		</>
	)
}

export default api.withTRPC(MyApp)
