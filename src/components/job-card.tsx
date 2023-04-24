import { Heading, Text, HStack, Card, IconButton, Icon, Stack, Badge, Skeleton, useToast, Box } from "@chakra-ui/react"
import { IconBookmark, IconMapPin, IconClock, IconCoinRupee } from "@tabler/icons-react"
import Link from "next/link"
import { api } from "@/utils/api"
import { formatDistance } from "date-fns"
import { useSession } from "next-auth/react"
import { ImageWithFallback } from "./image-with-fallback"

interface JobCardProps {
	jobId: string
}

export function JobCard({ jobId }: JobCardProps) {
	const toast = useToast()
	const { data: session } = useSession()

	const isCandidate = session?.user.role === "CANDIDATE"

	const apiContext = api.useContext()

	const { data: candidate } = api.candidate.current.useQuery(undefined, {
		enabled: isCandidate,
	})

	const { data: job, isLoading: jobLoading } = api.job.findById.useQuery(jobId)

	const jobIsLiked = job?.likedByIds.some((id) => id === candidate?.id)

	const employerId = job?.employerId

	const { data: employerProfile, isLoading: employerProfileLoading } = api.employer.findProfileByEmployerId.useQuery(
		employerId!,
		{
			enabled: !!employerId,
		}
	)

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

	if (!job || jobLoading || !employerProfile || employerProfileLoading) return <Skeleton h={"200px"} />

	const currentDate = new Date()
	const jobPostedAgo = formatDistance(currentDate, job.createdAt)

	return (
		<Card
			rounded={"sm"}
			overflow={"hidden"}
			bg="white"
			border={"1px"}
			borderColor={"gray.300"}
			transitionProperty={"transform, box-shadow"}
			transitionDuration={"100ms"}
			transitionTimingFunction={"ease-in-out"}
			_hover={{
				transform: "translateY(-3px)",
				boxShadow: "lg",
			}}
		>
			<Stack p={6}>
				<HStack justify={"space-between"}>
					<HStack align={"start"}>
						<Box borderRadius={"full"} overflow={"hidden"}>
							<ImageWithFallback
								src={employerProfile.companyImage ?? ""}
								fallback="/placeholder-user-image.png"
								height={50}
								width={50}
								alt={employerProfile.companyName}
							/>
						</Box>

						<Stack spacing={0}>
							<Link
								href={{
									pathname: "/employers/[employerId]",
									query: { employerId: employerProfile.employerId },
								}}
							>
								<Text
									fontSize={"lg"}
									fontWeight={600}
									_hover={{ color: "blue.600" }}
									textAlign={"left"}
								>
									{employerProfile.companyName}
								</Text>
							</Link>

							<HStack color={"gray.500"}>
								<Icon as={IconMapPin} />
								<Text>{job.location}</Text>
							</HStack>
						</Stack>
					</HStack>

					<IconButton
						aria-label="Bookmark Job"
						icon={<Icon as={IconBookmark} />}
						colorScheme={jobIsLiked ? "blue" : "gray"}
						onClick={() => {
							if (!isCandidate) {
								toast({
									status: "warning",
									title: "Only candidates can save job",
									isClosable: true,
								})
								return
							}
							toggleLikeJob(job.id)
						}}
						isLoading={togglingLikeJob}
					/>
				</HStack>

				<Stack flexGrow={1}>
					<Link
						href={{
							pathname: "/jobs/[jobId]",
							query: { jobId: job.id },
						}}
					>
						<Heading fontSize={"2xl"} _hover={{ color: "blue.600" }} textAlign={"left"}>
							{job.title}
						</Heading>
					</Link>

					<HStack color={"gray.500"} spacing={4} flexWrap={"wrap"}>
						<HStack>
							<Icon as={IconCoinRupee} />
							<Text>₹{job.salary}</Text>
						</HStack>

						<HStack>
							<Icon as={IconClock} />
							<Text>{jobPostedAgo}</Text>
						</HStack>
					</HStack>
				</Stack>

				<HStack flexWrap={"wrap"}>
					{job.categories.map((category) => (
						<Badge
							key={category.label}
							textTransform={"uppercase"}
							px={2}
							py={1}
							bg="blue.400"
							color="white"
							borderRadius="full"
						>
							{category.value}
						</Badge>
					))}
				</HStack>
			</Stack>
		</Card>
	)
}

export default JobCard
