import RootLayout from "@/layouts/root-layout"
import { Box, Button, Center, Container, Heading, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"

export default function ErrorPage() {
	return (
		<>
			<Head>
				<title>Not Found | Jobby</title>
			</Head>

			<RootLayout>
				<Container textAlign={"center"}>
					<Stack align={"center"} spacing={6}>
						<Heading>Nothing to see here</Heading>
						<Text>
							Page you are trying to open does not exist. You may have mistyped the address, or the page
							has been moved to another URL. If you think this is an error contact support.
						</Text>
						<Button colorScheme="brand" as={Link} href={"/"} w="fit-content">
							Take me back to home page
						</Button>
					</Stack>
				</Container>
			</RootLayout>
		</>
	)
}
