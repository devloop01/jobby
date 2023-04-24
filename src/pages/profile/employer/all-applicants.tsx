import Head from "next/head"

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import { api } from "@/utils/api"

import EmployerProfileLayout from "@/layouts/employer-profile-layout"
import RootLayout from "@/layouts/root-layout"

import { isEmployer } from "@/utils"
import Link from "next/link"
import JobCard from "@/components/job-card"
import CandidateCard from "@/components/candidate-card"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = isEmployer(async () => {
	return {
		props: {},
	}
})

export default function EmployerProfile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: applicants, isLoading: applicantsLoading } = api.employer.findAllApplicants.useQuery()

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
									All Job Applicants
								</Heading>

								{applicants && (
									<>
										{applicants.length === 0 && (
											<Stack align={"center"} py={12}>
												<Text fontSize={"2xl"} fontWeight={600}>
													No applicants
												</Text>
												{/* <Button as={Link} href="/applicants" size={"sm"} colorScheme="brand">
													Browse Applicants
												</Button> */}
											</Stack>
										)}
										<Box py={6}>
											<Stack>
												{applicants.map((candidate) => (
													<CandidateCard key={candidate.id} candidateId={candidate.id} />
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
