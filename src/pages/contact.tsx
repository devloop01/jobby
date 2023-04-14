import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function Contact() {
	return (
		<>
			<Head>
				<title>Contact | Jobby</title>
			</Head>

			<RootLayout>
				<Heading>Contact</Heading>
			</RootLayout>
		</>
	)
}
