import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Head from "next/head"

import RootLayout from "@/layouts/root-layout"
import { Box, Button, Center, Grid, GridItem, HStack, Heading, Spinner, Stack, Text } from "@chakra-ui/react"
import JobCard from "@/components/job-card"
import { api } from "@/utils/api"
import { useEffect } from "react"
import Link from "next/link"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const employerId = context.query.id as string

	return {
		props: { employerId },
	}
}

export default function CompanyJobs({ employerId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const {
		data: employerProfile,
		isLoading: employerProfileLoading,
		error: employerError,
	} = api.employer.findProfileByEmployerId.useQuery(employerId, { retry: false })
	const { data: jobs } = api.job.findByEmployerId.useQuery({ employerId }, { retry: false })

	if (!employerProfile && employerProfileLoading)
		return (
			<Center h={"100vh"}>
				<Spinner />
			</Center>
		)

	if (employerError)
		return (
			<Center h={"100vh"}>
				<Stack>
					<Text fontSize={"2xl"}>Failed To Load</Text>
					<Button as={Link} href={"/"}>
						Return Home
					</Button>
				</Stack>
			</Center>
		)

	return (
		<>
			<Head>
				<title>{`Jobs by ${employerProfile.companyName} | Jobby`}</title>
			</Head>

			<RootLayout>
				<Stack spacing={6}>
					<HStack>
						<Heading>Jobs by {employerProfile.companyName}</Heading>
						{jobs && <Text fontSize={"xl"} fontWeight={600}>{`(${jobs.length} jobs open)`}</Text>}
					</HStack>

					{jobs && (
						<Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
							{jobs.map((job) => (
								<GridItem key={job.id}>
									<JobCard jobId={job.id} />
								</GridItem>
							))}
						</Grid>
					)}
				</Stack>
			</RootLayout>
		</>
	)
}
