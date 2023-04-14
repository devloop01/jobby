import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function Careers() {
	return (
		<>
			<Head>
				<title>Careers | Jobby</title>
			</Head>

			<RootLayout>
				<Heading>Careers</Heading>
			</RootLayout>
		</>
	)
}
