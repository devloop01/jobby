import ContactForm from "@/components/contact-form"
import RootLayout from "@/layouts/root-layout"
import {
	Box,
	Container,
	Flex,
	Grid,
	GridItem,
	HStack,
	Heading,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react"
import {
	IconAt,
	IconPhone,
	IconMapPin,
	IconBrandFacebookFilled,
	IconBrandGithubFilled,
	IconBrandDiscordFilled,
} from "@tabler/icons-react"
import Head from "next/head"

export default function Contact() {
	return (
		<>
			<Head>
				<title>Contact | Jobby</title>
			</Head>

			<RootLayout>
				<Container maxW="full" mt={0} centerContent overflow="hidden">
					<Box
						bg="#3393e5"
						color="white"
						borderRadius="lg"
						w="full"
						my={{ sm: 6, md: 16, lg: 24 }}
						p={{ sm: 5, md: 5, lg: 16 }}
					>
						<Box p={4}>
							<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={{ base: 20, sm: 3, md: 5, lg: 20 }}>
								<GridItem>
									<Box>
										<Heading>Contact us</Heading>
										<Text mt={2}>Leave your email and we will get back to you within 24 hours</Text>
										<Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
											<VStack pl={0} spacing={6} alignItems="flex-start">
												<Box>
													<Flex align={"center"} gap={3}>
														<IconPhone size={22} />
														<Flex direction={"column"}>
															<Text fontSize={"sm"} fontWeight={300}>
																Phone
															</Text>
															<Text fontSize={"sm"}>+91-988888888</Text>
														</Flex>
													</Flex>
												</Box>
												<Box>
													<Flex align={"center"} gap={3}>
														<IconAt size={22} />
														<Flex direction={"column"}>
															<Text fontSize={"sm"} fontWeight={300}>
																Email
															</Text>
															<Text fontSize={"sm"}>contact@jobby.com</Text>
														</Flex>
													</Flex>
												</Box>
												<Box>
													<Flex align={"center"} gap={3}>
														<IconMapPin size={22} />
														<Flex direction={"column"}>
															<Text fontSize={"sm"} fontWeight={300}>
																Address
															</Text>
															<Text fontSize={"sm"}>West Bengal, Siliguri</Text>
														</Flex>
													</Flex>
												</Box>
											</VStack>
										</Box>
										<HStack mt={{ lg: 10, md: 10 }} spacing={0} alignItems="flex-start">
											<IconButton
												aria-label="facebook"
												variant="ghost"
												size="lg"
												isRound={true}
												_hover={{ opacity: 0.75 }}
												icon={<IconBrandFacebookFilled size={22} />}
											/>
											<IconButton
												aria-label="github"
												variant="ghost"
												size="lg"
												isRound={true}
												_hover={{ opacity: 0.75 }}
												icon={<IconBrandGithubFilled size={22} />}
											/>
											<IconButton
												aria-label="discord"
												variant="ghost"
												size="lg"
												isRound={true}
												_hover={{ opacity: 0.75 }}
												icon={<IconBrandDiscordFilled size={22} />}
											/>
										</HStack>
									</Box>
								</GridItem>

								<GridItem>
									<ContactForm />
								</GridItem>
							</Grid>
						</Box>
					</Box>
				</Container>
			</RootLayout>
		</>
	)
}
