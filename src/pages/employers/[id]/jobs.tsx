import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Head from "next/head"

import RootLayout from "@/layouts/root-layout"
import { Box, Grid, GridItem, Heading, Stack } from "@chakra-ui/react"
import JobCard from "@/components/job-card"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const id = context.query.id as string

	return {
		props: { id },
	}
}

export default function CompanyJobs(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>{`Jobs by ${props.id} | Jobby`}</title>
			</Head>

			<RootLayout>
				<Box py={12}>
					<Stack spacing={6}>
						<Heading>Jobs by {props.id}</Heading>

						<Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
							{Array.from({ length: 10 }, () => 0).map((_, i) => (
								<GridItem key={i}>
									<JobCard />
								</GridItem>
							))}
						</Grid>
					</Stack>
				</Box>
			</RootLayout>
		</>
	)
}
