import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { ChakraProvider } from "@chakra-ui/react"
import Head from "next/head"

import "@fontsource/work-sans"
import "@fontsource/inter"

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
		</>
	)
}

export default api.withTRPC(MyApp)
