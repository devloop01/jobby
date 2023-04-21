import { useState } from "react"
import { Box, Heading, Text, Img, Flex, HStack, Card, IconButton, Icon, Stack, Badge, Skeleton } from "@chakra-ui/react"
import {
	IconArrowUpRight,
	IconHeartFilled,
	IconHeart,
	IconBookmark,
	IconBriefcase,
	IconMapPin,
	IconClock,
	IconCash,
	IconMoneybag,
	IconCoinRupee,
} from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { type JobPosting } from "@prisma/client"
import { api } from "@/utils/api"
import { formatDistance } from "date-fns"

interface JobCardProps {
	jobId: string
}

export function JobCard({ jobId }: JobCardProps) {
	const { data: job, isLoading: jobLoading } = api.job.findById.useQuery(jobId)

	const employerId = job?.employerId

	const { data: employer, isLoading: employerLoading } = api.employer.findById.useQuery(employerId!, {
		enabled: !!employerId,
	})

	const [liked, setLiked] = useState(false)

	if (!job || jobLoading || !employer || employerLoading) return <Skeleton h={"200px"} />

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
						<Image src={"/google.svg"} height={50} width={50} alt={"Company Avatar"} />

						<Stack spacing={0}>
							<Link
								href={{
									pathname: "/employers/[employerId]",
									query: { employerId: employer.id },
								}}
							>
								<Text fontSize={"lg"} fontWeight={600} _hover={{ color: "blue.600" }}>
									{employer.companyName}
								</Text>
							</Link>

							<HStack color={"gray.500"}>
								<Icon as={IconMapPin} />
								<Text>{job.location}</Text>
							</HStack>
						</Stack>
					</HStack>

					<IconButton aria-label="Bookmark Job" icon={<Icon as={IconBookmark} />} />
				</HStack>
				<Stack flexGrow={1}>
					<Link
						href={{
							pathname: "/jobs/[jobId]",
							query: { jobId: job.id },
						}}
					>
						<Heading fontSize={"2xl"} _hover={{ color: "blue.600" }}>
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
			</Stack>
		</Card>
	)
}

export default JobCard
