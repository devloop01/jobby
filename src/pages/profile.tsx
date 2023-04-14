import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function Profile() {
	return (
		<>
			<Head>
				<title>Profile | Jobby</title>
			</Head>

			<RootLayout>
				<Heading>Profile</Heading>
			</RootLayout>
		</>
	)
}
