import { Box, Text, HStack, Card, Icon, Stack, Button, Skeleton } from "@chakra-ui/react"
import { IconMapPin } from "@tabler/icons-react"
import Image from "next/image"
import NextLink from "next/link"
import { api } from "@/utils/api"

interface EmployerCardProps {
	employerId: string
}

export function EmployerCard({ employerId }: EmployerCardProps) {
	const { data: employerProfile, isLoading: employerProfileLoading } =
		api.employer.findProfileByEmployerId.useQuery(employerId)

	if (!employerProfile || employerProfileLoading) return <Skeleton h={"200px"} />

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
				<Stack align={"center"} textAlign={"center"}>
					<Image src={"./google.svg"} height={64} width={64} alt={"Company Avatar"} />

					<Box>
						<NextLink
							href={{
								pathname: "/employers/[employerId]",
								query: { employerId: employerProfile.id },
							}}
						>
							<Text fontSize={"xl"} fontWeight={600} _hover={{ color: "blue.500" }}>
								{employerProfile.companyName}
							</Text>
						</NextLink>

						<HStack color={"gray.500"}>
							<Icon as={IconMapPin} />
							<Text>{employerProfile.companyAddress}</Text>
						</HStack>
					</Box>

					<Button
						as={NextLink}
						href={{
							pathname: "/employers/[employerId]/jobs",
							query: { employerId: employerProfile.id },
						}}
					>
						12 Jobs Open
					</Button>
				</Stack>
			</Stack>
		</Card>
	)
}

export default EmployerCard
