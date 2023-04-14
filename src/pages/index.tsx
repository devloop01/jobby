import { type NextPage } from "next"
import Head from "next/head"
import NextLink from "next/link"

import { api } from "@/utils/api"
import RootLayout from "@/layouts/root-layout"
import { Box } from "@chakra-ui/react"
import Hero from "@/components/common/hero"

const Home: NextPage = () => {
	return (
		<>
			<RootLayout>
				<Box py={8}>
					<Hero />
				</Box>
			</RootLayout>
		</>
	)
}

export default Home
