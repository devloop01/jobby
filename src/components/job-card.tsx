import { useState } from "react"
import { Box, Heading, Text, Img, Flex, HStack, Card, IconButton, Icon, Stack, Badge } from "@chakra-ui/react"
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

export function JobCard() {
	const [liked, setLiked] = useState(false)

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
									query: { employerId: "random-id" },
								}}
							>
								<Text fontSize={"lg"} fontWeight={600} _hover={{ color: "blue.600" }}>
									Google
								</Text>
							</Link>

							<HStack color={"gray.500"}>
								<Icon as={IconMapPin} />
								<Text>New Delhi</Text>
							</HStack>
						</Stack>
					</HStack>

					<IconButton aria-label="Bookmark Job" icon={<Icon as={IconBookmark} />} />
				</HStack>
				<Stack flexGrow={1}>
					<Link
						href={{
							pathname: "/jobs/[jobId]",
							query: { jobId: "random-id" },
						}}
					>
						<Heading fontSize={"2xl"} _hover={{ color: "blue.600" }}>
							Software Engineer (Android), Libraries
						</Heading>
					</Link>

					<HStack color={"gray.500"} spacing={4} flexWrap={"wrap"}>
						<HStack>
							<Icon as={IconCoinRupee} />
							<Text>₹35k - ₹45k</Text>
						</HStack>

						<HStack>
							<Icon as={IconClock} />
							<Text>11 hours ago</Text>
						</HStack>
					</HStack>

					<HStack>
						<Badge color="white" bg="blue.400" py={1} px={2}>
							Adobe
						</Badge>
						<Badge color="white" bg="blue.400" py={1} px={2}>
							Figma
						</Badge>
					</HStack>
				</Stack>
			</Stack>
		</Card>
	)
}

export default JobCard
