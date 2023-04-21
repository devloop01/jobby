import JobCard from "@/components/job-card"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import {
	Box,
	Button,
	Card,
	CardBody,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	SelectField,
	Stack,
} from "@chakra-ui/react"
import { IconBriefcase, IconMapPin, IconSearch } from "@tabler/icons-react"
import Head from "next/head"

export default function Jobs() {
	const { data: jobs } = api.job.find.useQuery()

	return (
		<>
			<Head>
				<title>Find Jobs | Jobby</title>
			</Head>

			<RootLayout>
				<Stack spacing={6} textAlign={"center"} bg={"blue.500"}>
					<Heading color={"white"} fontSize={"4xl"}>
						Find perfect jobs for yourself
					</Heading>
					<Flex align={"center"} justify={"center"} px={{ base: 0, md: 10 }}>
						<Card borderRadius={"lg"} border={"1px"} borderColor={"gray.300"} boxShadow={"lg"} w="full">
							<CardBody p={8}>
								<Grid templateColumns={{ md: "repeat(12, 1fr)" }} gap={6}>
									<GridItem colSpan={4}>
										<InputGroup>
											<InputLeftElement>
												<Icon as={IconSearch} color={"gray.500"} />
											</InputLeftElement>
											<Input variant={"flushed"} placeholder="Job title, keywords or company" />
										</InputGroup>
									</GridItem>

									<GridItem colSpan={2}>
										<InputGroup>
											<InputLeftElement>
												<Icon as={IconMapPin} color={"gray.500"} />
											</InputLeftElement>
											<Input variant={"flushed"} placeholder="City or pincode" />
										</InputGroup>
									</GridItem>

									<GridItem colSpan={4}>
										<InputGroup>
											<InputLeftElement>
												<Icon as={IconBriefcase} color={"gray.500"} />
											</InputLeftElement>
											<Select placeholder="Choose a category" variant={"flushed"} pl={10}>
												<option value="freelance">freelance</option>
											</Select>
										</InputGroup>
									</GridItem>

									<GridItem colSpan={2}>
										<Button w="full" size={"lg"} colorScheme="brand" fontSize={"md"}>
											Find Jobs
										</Button>
									</GridItem>
								</Grid>
							</CardBody>
						</Card>
					</Flex>
				</Stack>

				<Stack my={12} spacing={12}>
					<Flex justify={"space-between"}>
						<Grid templateColumns={{ sm: "repeat(3, 1fr)" }}>
							<GridItem>
								<Select bg="blue.400" color="white" placeholder="Job Type"></Select>
							</GridItem>
							<GridItem>
								<Select bg="blue.400" color="white" placeholder="Experience Level"></Select>
							</GridItem>
							<GridItem>
								<Select bg="blue.400" color="white" placeholder="Salary"></Select>
							</GridItem>
						</Grid>

						<Stack direction={"row"}>
							<Select placeholder="Sort by (default)"></Select>
						</Stack>
					</Flex>

					<Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap={8}>
						{jobs?.map((job) => (
							<GridItem key={job.id}>
								<JobCard job={job} />
							</GridItem>
						))}
					</Grid>
				</Stack>
			</RootLayout>
		</>
	)
}
