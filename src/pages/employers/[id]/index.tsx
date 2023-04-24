import JobCard from "@/components/job-card"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	HStack,
	Heading,
	Icon,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react"
import {
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitterFilled,
} from "@tabler/icons-react"
import type { InferGetServerSidePropsType, GetServerSidePropsContext } from "next"
import Head from "next/head"
import Image from "next/image"
import NextLink from "next/link"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const employerId = context.query.id as string

	return {
		props: { employerId },
	}
}

export default function JobDetails({ employerId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: employerProfile, isLoading: employerProfileLoading } =
		api.employer.findProfileByEmployerId.useQuery(employerId)
	const { data: jobs, isLoading: jobsLoading } = api.job.findByEmployerId.useQuery({
		employerId,
		limit: 3,
	})

	if (!employerProfile || employerProfileLoading)
		return (
			<Center h={"100vh"}>
				<Spinner />
			</Center>
		)

	return (
		<>
			<Head>
				<title>{`${employerProfile.companyName} | Jobby`}</title>
			</Head>

			<RootLayout>
				<Stack>
					<Box py={12} bgGradient={"linear(to-r, white, blue.100)"}>
						<Center>
							<Stack textAlign={"center"}>
								<Image src={"/google.svg"} height={120} width={120} alt={"Company Avatar"} />
								<Text fontSize={"3xl"} fontWeight={600}>
									{employerProfile.companyName}
								</Text>
							</Stack>
						</Center>
					</Box>

					<Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ md: 12 }} py={8}>
						<GridItem colSpan={4} as={Stack} spacing={8} my={{ base: 12, md: 0 }}>
							<Stack
								p={6}
								spacing={4}
								bg="blue.50"
								border={"1px"}
								borderColor={"blue.100"}
								borderRadius={"lg"}
							>
								<Stack px={4} spacing={4}>
									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Company Size:</Text>
										<Text color={"gray.600"}>{employerProfile.companySize}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Founded In:</Text>
										<Text color={"gray.600"}>{employerProfile.companyFoundedYear}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Phone:</Text>
										<Text color={"gray.600"}>{employerProfile.companyPhone}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Email:</Text>
										<Text color={"gray.600"}>{employerProfile.companyEmail}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Location:</Text>
										<Text color={"gray.600"}>{employerProfile.companyAddress}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Social Links:</Text>
										<HStack color={"gray.500"}>
											<NextLink href={"/"} target="_blank">
												<Icon as={IconBrandFacebookFilled} _hover={{ color: "gray.800" }} />
											</NextLink>
											<NextLink href={"/"} target="_blank">
												<Icon as={IconBrandTwitterFilled} _hover={{ color: "gray.800" }} />
											</NextLink>
											<NextLink href={"/"} target="_blank">
												<Icon as={IconBrandInstagram} _hover={{ color: "gray.800" }} />
											</NextLink>
											<NextLink href={"/"} target="_blank">
												<Icon as={IconBrandLinkedin} _hover={{ color: "gray.800" }} />
											</NextLink>
										</HStack>
									</HStack>
								</Stack>
							</Stack>
						</GridItem>

						<GridItem colSpan={8}>
							<Stack spacing={8}>
								{employerProfile.companyDescription?.length !== 0 && (
									<Stack>
										<Heading as="h3" fontSize={"3xl"}>
											About Company
										</Heading>

										<Text color={"gray.700"}>{employerProfile.companyDescription}</Text>
									</Stack>
								)}

								{jobs && (
									<Stack spacing={6}>
										<Text fontSize={"2xl"} fontWeight={700}>
											{jobs.length} other jobs available
										</Text>

										{jobsLoading && (
											<Center h={"200px"}>
												<Spinner />
											</Center>
										)}

										<Stack spacing={6}>
											{jobs.map((job) => (
												<JobCard key={job.id} jobId={job.id} />
											))}
											<Flex>
												<Button
													variant={"outline"}
													colorScheme="blue"
													as={NextLink}
													href={{
														pathname: "/employers/[employerId]/jobs",
														query: { employerId: employerProfile.id },
													}}
												>
													Show more
												</Button>
											</Flex>
										</Stack>
									</Stack>
								)}
							</Stack>
						</GridItem>
					</Grid>
				</Stack>
			</RootLayout>
		</>
	)
}
