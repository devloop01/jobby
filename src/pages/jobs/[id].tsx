import { IconGoogle } from "@/components/icons"
import { ImageWithFallback } from "@/components/image-with-fallback"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Grid,
	GridItem,
	HStack,
	Heading,
	Icon,
	IconButton,
	ListItem,
	Spinner,
	Stack,
	Text,
	UnorderedList,
	useToast,
} from "@chakra-ui/react"
import {
	IconBrandFacebook,
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitter,
	IconBrandTwitterFilled,
	IconCash,
	IconHourglass,
	IconMapPin,
} from "@tabler/icons-react"
import { IconBookmark, IconBriefcase, IconCalendar, IconClock } from "@tabler/icons-react"
import type { InferGetServerSidePropsType, GetServerSidePropsContext } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import NextLink from "next/link"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const jobId = context.query.id as string

	return {
		props: { jobId },
	}
}

export default function JobDetails({ jobId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const toast = useToast()
	const { data: session } = useSession()

	const isCandidate = session?.user.role === "CANDIDATE"

	const { data: job, isLoading: jobLoading } = api.job.findById.useQuery(jobId)

	const apiContext = api.useContext()

	const { data: candidate } = api.candidate.current.useQuery(undefined, {
		enabled: isCandidate,
	})

	const employerId = job?.employerId

	const { data: employerProfile, isLoading: employerProfileLoading } = api.employer.findProfileByEmployerId.useQuery(
		employerId!,
		{
			enabled: !!employerId,
		}
	)

	const { mutate: applyJob, isLoading: applyingJob } = api.candidate.applyJob.useMutation({
		onSuccess: () => {
			toast({
				status: "success",
				title: "Applied for job",
				duration: 5000,
				isClosable: true,
			})
			void apiContext.job.findById.invalidate()
		},
		onError: (error) => {
			toast({
				status: "error",
				title: "Failed to apply for job!",
				description: error.message,
				duration: 5000,
				isClosable: true,
			})
		},
	})

	const jobIsLiked = job?.likedByIds.some((id) => id === candidate?.id)
	const jobIsApplied = job?.appliedByIds.some((id) => id === candidate?.id)

	const { mutate: toggleLikeJob, isLoading: togglingLikeJob } = api.candidate.toggleLikeJob.useMutation({
		onSuccess: () => {
			if (jobIsLiked) {
				toast({
					status: "warning",
					title: "Job unsaved",
					duration: 3000,
					isClosable: true,
				})
			} else {
				toast({
					status: "success",
					title: "Job Saved",
					duration: 3000,
					isClosable: true,
				})
			}
			void apiContext.job.findById.invalidate()
			void apiContext.candidate.findAllLikedJobs.invalidate()
		},
		onError: () => {
			toast({
				status: "error",
				title: "Cannot Save Job",
				description: "Jobs can only be saved by a candidate!",
				duration: 4000,
				isClosable: true,
			})
		},
	})

	const onJobApplyClick = () => {
		if (job) {
			applyJob({
				jobId: job.id,
			})
		}
	}

	if (!job || jobLoading || !employerProfile || employerProfileLoading)
		return (
			<Center h={"100vh"}>
				<Spinner />
			</Center>
		)

	return (
		<>
			<Head>
				<title>{`${job.title} | Jobby`}</title>
			</Head>

			<RootLayout>
				<Stack>
					<Stack spacing={6}>
						<Box py={12} bgGradient={"linear(to-r, white, blue.100)"}>
							<Center>
								<Stack textAlign={"center"} align={"center"}>
									<Box w={200} h={200} borderRadius={"full"} overflow={"hidden"}>
										<ImageWithFallback
											src={employerProfile.companyImage ?? ""}
											fallback="/placeholder-user-image.png"
											height={120}
											width={120}
											alt={employerProfile.companyName}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</Box>
									<Text fontSize={"3xl"} fontWeight={600}>
										{employerProfile.companyName}
									</Text>
								</Stack>
							</Center>
						</Box>

						<Flex justify={"space-between"} gap={4} direction={{ base: "column", md: "row" }}>
							<Box>
								<Box>
									<Heading fontSize={"3xl"}>{job.title}</Heading>

									<HStack>
										<HStack color={"gray.500"}>
											<Icon as={IconBriefcase} />
											<Text>Fulltime</Text>
										</HStack>

										<HStack color={"gray.500"}>
											<Icon as={IconClock} />
											<Text>3 mins ago</Text>
										</HStack>
									</HStack>
								</Box>
							</Box>

							{session?.user.role === "CANDIDATE" &&
								(jobIsApplied ? (
									<HStack>
										<Button size={"lg"} colorScheme="brand" fontSize={"md"} isDisabled>
											Applied
										</Button>
									</HStack>
								) : (
									<HStack>
										<Button
											size={"lg"}
											colorScheme="brand"
											fontSize={"md"}
											onClick={onJobApplyClick}
											isLoading={applyingJob}
										>
											Apply For Job
										</Button>

										<IconButton
											aria-label="Bookmark Job"
											size={"lg"}
											colorScheme="brand"
											icon={<Icon as={IconBookmark} />}
											variant={jobIsLiked ? "solid" : "outline"}
											onClick={() => {
												if (!isCandidate) return
												toggleLikeJob(job.id)
											}}
											isLoading={togglingLikeJob}
										/>
									</HStack>
								))}
						</Flex>
					</Stack>

					<Divider borderColor={"gray.400"} />

					<Grid templateColumns={{ base: "1fr", md: "repeat(12, 1fr)" }} gap={{ md: 12 }} py={8}>
						<GridItem colSpan={8}>
							<Stack spacing={8}>
								<Stack>
									<Heading as="h3" fontSize={"2xl"}>
										Job Description
									</Heading>
									<Text color={"gray.700"}>{job.description}</Text>
								</Stack>

								<Stack>
									<Heading as="h3" fontSize={"2xl"}>
										Key Responsibilities
									</Heading>
									<UnorderedList px={4} spacing={2} color={"gray.700"}>
										{job.keyResponsibilities.map((s, i) => (
											<ListItem key={i}>{s.value}</ListItem>
										))}
									</UnorderedList>
								</Stack>

								<Stack>
									<Heading as="h3" fontSize={"2xl"}>
										Skill & Experience
									</Heading>
									<UnorderedList px={4} spacing={2} color={"gray.700"}>
										{job.skillAndExperience.map((s, i) => (
											<ListItem key={i}>{s.value}</ListItem>
										))}
									</UnorderedList>
								</Stack>

								<Divider borderColor={"gray.400"} />

								<HStack spacing={6}>
									<Text fontWeight="bold">Share this job</Text>
									<HStack>
										<Button colorScheme="facebook" leftIcon={<Icon as={IconBrandFacebook} />}>
											Facebook
										</Button>
										<Button colorScheme="twitter" leftIcon={<Icon as={IconBrandTwitter} />}>
											Twitter
										</Button>
										<Button colorScheme="linkedin" leftIcon={<Icon as={IconBrandLinkedin} />}>
											Linkedin
										</Button>
									</HStack>
								</HStack>
							</Stack>
						</GridItem>

						<GridItem colSpan={4} as={Stack} spacing={8} my={{ base: 12, md: 0 }}>
							<Stack
								p={6}
								spacing={4}
								bg="blue.50"
								border={"1px"}
								borderColor={"blue.100"}
								borderRadius={"lg"}
							>
								<Text fontSize={"2xl"} fontWeight={"bold"}>
									Job Overview
								</Text>

								<Stack spacing={5} px={4}>
									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconCalendar} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Date Posted:</Text>
											<Text color={"gray.600"}>{job.createdAt.toDateString()}</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconHourglass} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Expiration date:</Text>
											<Text color={"gray.600"}>{job.expirationDate.toDateString()}</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconMapPin} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Location:</Text>
											<Text color={"gray.600"}>{job.location}</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconClock} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Hours:</Text>
											<Text color={"gray.600"}>{job.hours}h / week</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconCash} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Salary:</Text>
											<Text color={"gray.600"}>₹{job.salary}</Text>
										</Box>
									</HStack>
								</Stack>
							</Stack>

							<Stack
								p={6}
								spacing={4}
								bg="blue.50"
								border={"1px"}
								borderColor={"blue.100"}
								borderRadius={"lg"}
							>
								<HStack>
									<Box width={"60px"} height={"60px"} borderRadius={"full"} overflow={"hidden"}>
										<ImageWithFallback
											src={employerProfile.companyImage ?? ""}
											fallback="/placeholder-user-image.png"
											height={50}
											width={50}
											alt={employerProfile.companyName}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</Box>
									<Box>
										<Text fontWeight={700} fontSize={"xl"}>
											Google
										</Text>

										<Text
											as={NextLink}
											href={{
												pathname: "/employers/[employerId]",
												query: {
													employerId: employerProfile.id,
												},
											}}
											fontSize={"sm"}
											fontWeight={500}
											color={"blue.500"}
											display={"inline-block"}
											_hover={{
												color: "blue.400",
											}}
										>
											view company profile
										</Text>
									</Box>
								</HStack>

								<Divider borderColor={"blue.200"} />

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
					</Grid>
				</Stack>
			</RootLayout>
		</>
	)
}
