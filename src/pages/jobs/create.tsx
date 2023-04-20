import RootLayout from "@/layouts/root-layout"
import { Heading, Stack } from "@chakra-ui/react"
import { type GetServerSidePropsContext } from "next"
import Head from "next/head"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {},
	}
}

export default function CreateJob() {
	return (
		<>
			<Head>
				<title>Create a Job | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<Heading>Create Job</Heading>
				</Stack>
			</RootLayout>
		</>
	)
}
