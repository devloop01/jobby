import { api } from "@/utils/api"
import { Heading, Box, Center, Text, Stack, Badge, Skeleton } from "@chakra-ui/react"
import { ImageWithFallback } from "./image-with-fallback"
import Link from "next/link"

interface CandidateCardProps {
	candidateId: string
}

export function CandidateCard({ candidateId }: CandidateCardProps) {
	const { data: candidate, isLoading: candidateLoading } = api.candidate.findById.useQuery(candidateId)

	const { data: candidateProfile, isLoading: candidateProfileLoading } =
		api.candidate.findProfileByCandidateId.useQuery(candidateId)

	if (!candidate || !candidateProfile || candidateLoading || candidateProfileLoading) return <Skeleton h={"200px"} />

	return (
		<Skeleton maxW={"320px"} isLoaded>
			<Stack
				maxW={"320px"}
				w={"full"}
				bg={"white"}
				boxShadow={"2xl"}
				rounded={"lg"}
				p={6}
				textAlign={"center"}
				border={"1px"}
				borderColor={"gray.200"}
			>
				<Center>
					<Box w="80px" h="80px" borderRadius={"full"} overflow={"hidden"}>
						<ImageWithFallback
							src={candidateProfile.image ?? ""}
							fallback="/placeholder-user-image"
							alt={candidateProfile.fullName ?? ""}
							width={50}
							height={50}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</Box>
				</Center>
				<Heading
					fontSize={"2xl"}
					fontFamily={"body"}
					as={Link}
					href={{
						pathname: "/candidates/[candidateId]",
						query: {
							candidateId: candidate.id,
						},
					}}
				>
					{candidateProfile.fullName}
				</Heading>
				<Text fontSize={"sm"} textAlign={"center"} color={"gray.600"} px={3} noOfLines={2}>
					{candidateProfile.bio}
				</Text>

				<Box>
					<Badge colorScheme="blue" px={3} py={1} borderRadius={"full"}>
						Applied Jobs: {candidate.appliedJobIds.length}
					</Badge>
				</Box>
			</Stack>
		</Skeleton>
	)
}

export default CandidateCard
