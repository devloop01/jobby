import { type NextPage } from "next"
import Head from "next/head"
import NextLink from "next/link"

import { api } from "@/utils/api"
import RootLayout from "@/layouts/root-layout"
import { Box, Button, Center, Container, Grid, GridItem, Heading, Spinner, Stack, Text } from "@chakra-ui/react"
import Hero from "@/components/common/hero"
import JobCard from "@/components/job-card"
import Link from "next/link"

const Home: NextPage = () => {
	const { data: jobs, isLoading: jobsLoading } = api.job.findAll.useQuery({
		limit: 4,
	})

	return (
		<>
			<RootLayout>
				<Hero />

				<Container maxW={"7xl"} textAlign={"center"}>
					<Heading fontSize={"4xl"}>Featured Jobs</Heading>
					<Text color={"gray.700"}>Know your worth and find the job that qualify your life</Text>

					{jobsLoading && (
						<Center h="200px">
							<Spinner />
						</Center>
					)}

					{jobs && (
						<Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={{ md: 6 }} py={6}>
							{jobs.map((job) => (
								<GridItem key={job.id}>
									<JobCard jobId={job.id} />
								</GridItem>
							))}
						</Grid>
					)}

					<Center>
						<Button as={Link} href={"/jobs"} colorScheme={"brand"}>
							Show more
						</Button>
					</Center>
				</Container>
			</RootLayout>
		</>
	)
}

export default Home
