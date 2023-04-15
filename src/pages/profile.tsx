import Head from "next/head"

import { withAuth } from "@/utils"

import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withAuth(async () => {
	return {
		props: {},
	}
})

export default function Profile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
