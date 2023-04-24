import { ImageWithFallback } from "@/components/image-with-fallback"
import JobCard from "@/components/job-card"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import {
	Badge,
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
	const candidateId = context.query.id as string

	return {
		props: { candidateId },
	}
}

export default function CandidateDetails({ candidateId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: candidateProfile, isLoading: candidateProfileLoading } =
		api.candidate.findProfileByCandidateId.useQuery(candidateId)

	if (!candidateProfile || candidateProfileLoading)
		return (
			<Center h={"100vh"}>
				<Spinner />
			</Center>
		)

	return (
		<>
			<Head>
				<title>{`${candidateProfile.fullName} - Profile | Jobby`}</title>
			</Head>

			<RootLayout>
				<Stack>
					<Box py={12} bgGradient={"linear(to-r, white, blue.100)"}>
						<Center>
							<Stack textAlign={"center"} align="center">
								<Box w={150} h={150} borderRadius={"full"} overflow={"hidden"}>
									<ImageWithFallback
										src={candidateProfile.image ?? ""}
										fallback="/placeholder-user-image.png"
										height={120}
										width={120}
										alt={candidateProfile.fullName}
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								</Box>
								<Text fontSize={"3xl"} fontWeight={600}>
									{candidateProfile.fullName}
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
										<Text fontWeight={600}>Job Title:</Text>
										<Text color={"gray.600"}>{candidateProfile.jobTitle}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Email:</Text>
										<Text color={"gray.600"}>{candidateProfile.email}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Phone:</Text>
										<Text color={"gray.600"}>{candidateProfile.phone}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Experience (In Years):</Text>
										<Text color={"gray.600"}>{candidateProfile.experienceInYears}</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Address:</Text>
										<Text color={"gray.600"}>
											{candidateProfile.country}, {candidateProfile.state},{" "}
											{candidateProfile.pincode}
										</Text>
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
							<Stack spacing={6}>
								<Stack>
									<Heading as="h3" fontSize={"3xl"}>
										Preffered Skills
									</Heading>
									<HStack>
										{candidateProfile.skills.map((skill) => (
											<Badge
												fontSize={"lg"}
												colorScheme="green"
												px={3}
												py={1}
												borderRadius={"full"}
												key={skill.value}
											>
												{skill.label}
											</Badge>
										))}
									</HStack>
								</Stack>

								<Stack spacing={8}>
									{candidateProfile.bio?.length !== 0 && (
										<Stack>
											<Heading as="h3" fontSize={"3xl"}>
												About Me
											</Heading>

											<Text color={"gray.700"}>{candidateProfile.bio}</Text>
										</Stack>
									)}
								</Stack>
							</Stack>
						</GridItem>
					</Grid>
				</Stack>
			</RootLayout>
		</>
	)
}
