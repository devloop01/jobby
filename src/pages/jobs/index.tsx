import JobCard from "@/components/job-card"
import SearchForm from "@/components/search-form"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import {
	Alert,
	AlertTitle,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Heading,
	Select,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Jobs() {
	const router = useRouter()

	const searchText = router.query.searchText as string | undefined
	const sortBy = router.query.sortBy as string | undefined

	const {
		data: jobs,
		isLoading: jobsLoading,
		error: jobsError,
		refetch: refetchJobs,
	} = api.job.findAll.useQuery({
		jobTitle: searchText,
		sortBy,
	})

	return (
		<>
			<Head>
				<title>Find Jobs | Jobby</title>
			</Head>

			<RootLayout>
				<Stack spacing={6} textAlign={"center"} bg={"blue.500"} py={20}>
					<Heading color={"white"} fontSize={"4xl"}>
						Find perfect jobs for yourself
					</Heading>
					<Flex align={"center"} justify={"center"} px={{ base: 0, md: 10 }}>
						<SearchForm
							text={searchText}
							onSearchPress={({ jobTitle }) => {
								router.query.searchText = encodeURI(jobTitle)
								void router.push(router)
								void refetchJobs()
							}}
						/>
					</Flex>
				</Stack>

				<Stack my={12} spacing={12}>
					<Flex justify={"space-between"}>
						<Stack>
							<Text>Sort By</Text>
							<Select
								value={sortBy}
								onChange={(e) => {
									const sort = e.currentTarget.value
									router.query.sortBy = encodeURI(sort)
									void router.push(router)
									void refetchJobs()
								}}
							>
								<option value="latest">latest</option>
								<option value="asc">a-z</option>
								<option value="desc">z-a</option>
							</Select>
						</Stack>
					</Flex>

					{jobsError && (
						<Alert>
							<AlertTitle>{jobsError.message}</AlertTitle>
						</Alert>
					)}

					{jobsLoading && (
						<Center>
							<Spinner />
						</Center>
					)}

					{jobs && (
						<>
							{jobs.length === 0 && (
								<Center>
									<Stack>
										<Heading>Nothing Found!</Heading>
										<Button as={Link} href={"/jobs"}>
											Clear search
										</Button>
									</Stack>
								</Center>
							)}

							<Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
								{jobs.map((job) => (
									<GridItem key={job.id}>
										<JobCard jobId={job.id} />
									</GridItem>
								))}
							</Grid>
						</>
					)}
				</Stack>
			</RootLayout>
		</>
	)
}
