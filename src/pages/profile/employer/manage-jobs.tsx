import Head from "next/head"

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import { api } from "@/utils/api"

import EmployerProfileLayout from "@/layouts/employer-profile-layout"
import RootLayout from "@/layouts/root-layout"

import { isEmployer } from "@/utils"
import Link from "next/link"
import JobCard from "@/components/job-card"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = isEmployer(async () => {
	return {
		props: {},
	}
})

export default function EmployerProfile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: employer, isLoading: employerLoading } = api.employer.current.useQuery()

	const employerId = employer?.id

	const { data: jobs, isLoading: jobsLoading } = api.job.findByEmployerId.useQuery(
		{ employerId: employerId! },
		{ enabled: !!employerId }
	)

	return (
		<>
			<Head>
				<title>Profile - Employer | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<EmployerProfileLayout>
						<Stack px={{ base: 6, md: 12 }} spacing={6}>
							<Stack>
								<Heading as="h2" size="lg">
									Manage Jobs
								</Heading>

								{jobs && (
									<>
										{jobs.length === 0 && (
											<Stack align={"center"} py={12}>
												<Text fontSize={"2xl"} fontWeight={600}>
													No Jobs
												</Text>
												<Button as={Link} href="/jobs" size={"sm"} colorScheme="brand">
													Browse Jobs
												</Button>
											</Stack>
										)}
										<Box py={6}>
											<Stack>
												{jobs.map((job) => (
													<JobCard key={job.id} jobId={job.id} />
												))}
											</Stack>
										</Box>
									</>
								)}
							</Stack>
						</Stack>
					</EmployerProfileLayout>
				</Stack>
			</RootLayout>
		</>
	)
}
