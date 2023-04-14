import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function About() {
	return (
		<>
			<Head>
				<title>About Us | Jobby</title>
			</Head>

			<RootLayout>
				<Heading>About Us</Heading>
			</RootLayout>
		</>
	)
}
