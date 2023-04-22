import Head from "next/head"

import { withAuth } from "@/utils"

import RootLayout from "@/layouts/root-layout"
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import ProfileLayout from "@/layouts/profile-layout"
import { api } from "@/utils/api"
import JobCard from "@/components/job-card"
import Link from "next/link"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withAuth(async () => {
	return {
		props: {},
	}
})

export default function Profile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const {
		data: likedJobs,
		isLoading: loadingLikedJobs,
		error: errorLikedJobs,
	} = api.candidate.findAllLikedJobs.useQuery()

	return (
		<>
			<Head>
				<title>Profile | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<ProfileLayout>
						<Stack px={{ base: 6, md: 12 }}>
							<Heading as="h2" size="lg">
								Saved Jobs
							</Heading>

							{likedJobs && (
								<>
									{likedJobs.length === 0 && (
										<Stack align={"center"} py={12}>
											<Text fontSize={"2xl"} fontWeight={600}>
												No Saved Jobs
											</Text>
											<Button as={Link} href="/jobs" size={"sm"} colorScheme="brand">
												Browse Jobs
											</Button>
										</Stack>
									)}
									<Box py={6}>
										<Stack>
											{likedJobs.map((job) => (
												<JobCard key={job.id} jobId={job.id} />
											))}
										</Stack>
									</Box>
								</>
							)}
						</Stack>
					</ProfileLayout>
				</Stack>
			</RootLayout>
		</>
	)
}
