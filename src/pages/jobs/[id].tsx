import { IconGoogle } from "@/components/icons"
import RootLayout from "@/layouts/root-layout"
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
	List,
	ListItem,
	Stack,
	Text,
	UnorderedList,
	useBreakpointValue,
} from "@chakra-ui/react"
import {
	IconBrandFacebook,
	IconBrandFacebookFilled,
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandTwitter,
	IconBrandTwitterFilled,
	IconCash,
	IconCoinRupee,
	IconHourglass,
	IconMapPin,
	IconUser,
} from "@tabler/icons-react"
import { IconBookmark, IconBriefcase, IconBuilding, IconCalendar, IconClock } from "@tabler/icons-react"
import Head from "next/head"
import Image from "next/image"
import NextLink from "next/link"

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSideProps() {
	return {
		props: {},
	}
}

export default function JobDetails() {
	return (
		<>
			<Head>
				<title> | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<Stack py={8} spacing={6}>
						<Box w={"full"} height={"300px"} overflow={"hidden"} pos={"relative"}>
							<Image
								src="/cover.jpg"
								alt="company cover"
								width={1280}
								height={300}
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</Box>
						<Flex justify={"space-between"} gap={4} direction={{ base: "column", md: "row" }}>
							<Box>
								<Box>
									<Heading fontSize={"3xl"}>
										Senior Full Stack Engineer, Creator Success Full Time
									</Heading>

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

							<HStack>
								<Button size={"lg"} colorScheme="brand" fontSize={"md"}>
									Apply For Job
								</Button>

								<IconButton
									aria-label="Bookmark Job"
									size={"lg"}
									colorScheme="brand"
									variant="outline"
									icon={<Icon as={IconBookmark} />}
								/>
							</HStack>
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
									<Text color={"gray.700"}>
										As a Product Designer, you will work within a Product Delivery Team fused with
										UX, engineering, product and data talent. You will help the team design
										beautiful interfaces that solve business challenges for our clients. We work
										with a number of Tier 1 banks on building web-based applications for AML, KYC
										and Sanctions List management workflows. This role is ideal if you are looking
										to segue your career into the FinTech or Big Data arenas.
									</Text>
								</Stack>

								<Stack>
									<Heading as="h3" fontSize={"2xl"}>
										Key Responsibilities
									</Heading>
									<UnorderedList px={4} spacing={2} color={"gray.700"}>
										{[
											"Be involved in every step of the product design cycle from discovery to developer handoff and user acceptance testing.",
											"Work with BAs, product managers and tech teams to lead the Product Design",
											"Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.",
											"Accurately estimate design tickets during planning sessions.",
											"Contribute to sketching sessions involving non-designersCreate, iterate and maintain UI deliverables including sketch files, style guides, high fidelity prototypes, micro interaction specifications and pattern libraries.",
											"Ensure design choices are data led by identifying assumptions to test each sprint, and work with the analysts in your team to plan moderated usability test sessions.",
											"Design pixel perfect responsive UI’s and understand that adopting common interface patterns is better for UX than reinventing the wheel",
											"Present your work to the wider business at Show & Tell sessions.",
										].map((s, i) => (
											<ListItem key={i}>{s}</ListItem>
										))}
									</UnorderedList>
								</Stack>

								<Stack>
									<Heading as="h3" fontSize={"2xl"}>
										Skill & Experience
									</Heading>
									<UnorderedList px={4} spacing={2} color={"gray.700"}>
										{[
											"You have at least 3 years’ experience working as a Product Designer.",
											"You have experience using Sketch and InVision or Framer X",
											"You have some previous experience working in an agile environment – Think two-week sprints.",
											"You are familiar using Jira and Confluence in your workflow",
										].map((s, i) => (
											<ListItem key={i}>{s}</ListItem>
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
											<Text color={"gray.600"}>Posted 1 hours ago</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconHourglass} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Expiration date:</Text>
											<Text color={"gray.600"}>April 06, 2021</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconMapPin} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Location:</Text>
											<Text color={"gray.600"}>London, UK</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconUser} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Job Title:</Text>
											<Text color={"gray.600"}>Designer</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconClock} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Hours:</Text>
											<Text color={"gray.600"}>50h / week</Text>
										</Box>
									</HStack>

									<HStack align={"start"}>
										<Icon color={"blue.500"} w={8} h={8} as={IconCash} strokeWidth={1.5} />
										<Box>
											<Text fontWeight={500}>Salary:</Text>
											<Text color={"gray.600"}>₹35k - ₹45k</Text>
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
									<IconGoogle w={16} h={16} />
									<Box>
										<Text fontWeight={700} fontSize={"xl"}>
											Google
										</Text>

										<Text
											as={NextLink}
											href={{
												pathname: "/employers/[employerId]",
												query: {
													employerId: "random-id",
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
										<Text color={"gray.600"}>501-1,000</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Founded In:</Text>
										<Text color={"gray.600"}>2011</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Phone:</Text>
										<Text color={"gray.600"}>123 456 7890</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Email:</Text>
										<Text color={"gray.600"}>info@joio.com</Text>
									</HStack>

									<HStack justify={"space-between"}>
										<Text fontWeight={600}>Location:</Text>
										<Text color={"gray.600"}>London, UK</Text>
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
