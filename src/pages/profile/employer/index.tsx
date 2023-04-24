import Head from "next/head"

import {
	Box,
	Button,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Input,
	Radio,
	RadioGroup,
	Skeleton,
	Stack,
	Text,
	Textarea,
	useToast,
	useDisclosure,
	HStack,
	Icon,
	Badge,
	Tooltip,
} from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import { CreatableSelect } from "chakra-react-select"
import { useState } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	type CandidateProfileSchema,
	candidateProfileSchema,
	candidateContactSchema,
	type CandidateContactSchema,
} from "@/utils/schema/candidate"
import ImageUploader from "@/components/image-uploader"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { QuestionIcon } from "@chakra-ui/icons"
import { IconCircleFilled } from "@tabler/icons-react"

import EmployerProfileLayout from "@/layouts/employer-profile-layout"
import RootLayout from "@/layouts/root-layout"

import { isEmployer } from "@/utils"
import {
	type EmployerProfileSchema,
	employerProfileSchema,
	type EmployerContactSchema,
	employerContactSchema,
} from "@/utils/schema/employer"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = isEmployer(async () => {
	return {
		props: {},
	}
})

export default function EmployerProfile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { data: currentProfile, isLoading: profileLoading } = api.employer.currentProfile.useQuery()

	return (
		<>
			<Head>
				<title>Profile - Employer | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<EmployerProfileLayout>
						<Stack px={{ base: 6, md: 12 }} spacing={6}>
							<Stack>
								<Heading as="h2" size="lg">
									Company Profile
								</Heading>

								{currentProfile && (
									<Skeleton isLoaded={!profileLoading}>
										<HStack>
											<Text>Profile Status:</Text>

											<Badge
												colorScheme={currentProfile.isComplete ? "green" : "red"}
												px={3}
												py={1}
												borderRadius={"full"}
											>
												<HStack>
													<Icon as={IconCircleFilled} w={2} h={2} />
													<Text>
														{currentProfile.isComplete ? "complete" : "not complete"}
													</Text>
												</HStack>
											</Badge>

											{!currentProfile.isComplete && (
												<Tooltip
													hasArrow
													label="Complete your profile by filling every input"
													bg="gray.300"
													color="black"
												>
													<QuestionIcon />
												</Tooltip>
											)}
										</HStack>
									</Skeleton>
								)}
							</Stack>

							<ProfileForm />

							<ContactForm />

							<ChangePasswordForm />
						</Stack>
					</EmployerProfileLayout>
				</Stack>
			</RootLayout>
		</>
	)
}

function ProfileForm() {
	const {
		isOpen: imageUploadModalOpen,
		onOpen: openImageUploadModal,
		onClose: closeImageUploadModal,
	} = useDisclosure()

	const toast = useToast()

	const {
		register,
		formState: { errors, isDirty },
		handleSubmit,
		reset,
	} = useForm<EmployerProfileSchema>({
		resolver: zodResolver(employerProfileSchema),
	})

	const apiContext = api.useContext()

	const { data: currentProfile, isLoading: profileLoading } = api.employer.currentProfile.useQuery(undefined, {
		onSuccess: (data) => {
			if (data) {
				reset({
					companyName: data.companyName ?? "",
					companyPhone: data.companyPhone ?? "",
					companyEmail: data.companyEmail ?? "",
					companyWebsite: data.companyWebsite ?? "",
					companyFoundedYear: data.companyFoundedYear ?? "",
					companySize: data.companySize ?? "",
					companyAddress: data.companyAddress ?? "",
					companyDescription: data.companyDescription ?? "",
				})
			}
		},
	})

	const { mutate: updateProfile, isLoading: updatingProfile } = api.employer.updateProfile.useMutation({
		onSuccess: () => {
			toast({
				title: "Profile Updated",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

			void apiContext.employer.currentProfile.invalidate()
		},
	})

	const { mutate: updateProfileImage, isLoading: updateingProfileImage } =
		api.employer.updateProfileImage.useMutation({
			onSuccess: () => {
				toast({
					title: "Profile Image Updated",
					status: "success",
					duration: 3000,
					isClosable: true,
				})

				void apiContext.employer.currentProfile.invalidate()
			},
		})

	const onSubmit: SubmitHandler<EmployerProfileSchema> = (data) => {
		if (currentProfile) {
			updateProfile({
				id: currentProfile.id,
				...data,
			})
		}
	}

	return (
		<Stack spacing={5} p={8} border={"1px"} borderColor={"gray.300"} borderRadius={"2xl"} boxShadow={"lg"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={600}>
					Profile
				</Text>
				<Text color={"gray.500"}>Update your profile</Text>
			</Box>
			<Stack>
				<ImageUploader
					opened={imageUploadModalOpen}
					close={closeImageUploadModal}
					onComplete={(assembly) => {
						if (!currentProfile || !assembly.results.compress_image) return

						const imageUrl = assembly.results.compress_image[0]?.ssl_url as string

						updateProfileImage({
							id: currentProfile.id,
							imageUrl,
						})
					}}
				/>

				<Skeleton isLoaded={!profileLoading}>
					<Stack>
						<Skeleton w={"180px"} h={"180px"} isLoaded={!updateingProfileImage}>
							<Box w={"180px"} h={"180px"} borderRadius={12} overflow={"hidden"}>
								<ImageWithFallback
									src={currentProfile?.companyImage ?? ""}
									fallback="/placeholder-user-image.png"
									alt=""
									width={180}
									height={180}
									style={{
										objectFit: "cover",
										width: "100%",
										height: "100%",
									}}
								/>
							</Box>
						</Skeleton>
						<Flex gap={3}>
							<Button colorScheme="brand" size="xs" onClick={openImageUploadModal}>
								Upload
							</Button>
							<Button
								colorScheme="red"
								size="xs"
								onClick={() => {
									if (currentProfile) {
										updateProfileImage({
											id: currentProfile.id,
											imageUrl: null,
										})
									}
								}}
							>
								Remove
							</Button>
						</Flex>
					</Stack>
				</Skeleton>
			</Stack>
			<Divider />
			{/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyName" isInvalid={!!errors.companyName}>
							<FormLabel>Company Name</FormLabel>
							<Input type="text" size="lg" {...register("companyName")} />
							<FormErrorMessage>{errors.companyName && errors.companyName.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companySize" isInvalid={!!errors.companySize}>
							<FormLabel>Company Size</FormLabel>
							<Input type="text" size="lg" {...register("companySize")} />
							<FormErrorMessage>{errors.companySize && errors.companySize.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyPhone" isInvalid={!!errors.companyPhone}>
							<FormLabel>Company Phone</FormLabel>
							<Input type="text" size="lg" {...register("companyPhone")} />
							<FormErrorMessage>{errors.companyPhone && errors.companyPhone.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyEmail" isInvalid={!!errors.companyEmail}>
							<FormLabel>Company Email</FormLabel>
							<Input type="companyEmail" size="lg" {...register("companyEmail")} />
							<FormErrorMessage>{errors.companyEmail && errors.companyEmail.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyWebsite" isInvalid={!!errors.companyWebsite}>
							<FormLabel>Company Website</FormLabel>
							<Input type="text" size="lg" {...register("companyWebsite")} />
							<FormErrorMessage>
								{errors.companyWebsite && errors.companyWebsite.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyFoundedYear" isInvalid={!!errors.companyFoundedYear}>
							<FormLabel>Company Founded Year</FormLabel>
							<Input type="text" size="lg" {...register("companyFoundedYear")} />
							<FormErrorMessage>
								{errors.companyFoundedYear && errors.companyFoundedYear.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyAddress" isInvalid={!!errors.companyAddress}>
							<FormLabel>Company Address</FormLabel>
							<Input type="text" size="lg" {...register("companyAddress")} />
							<FormErrorMessage>
								{errors.companyAddress && errors.companyAddress.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem colSpan={2}>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="companyDescription" isInvalid={!!errors.companyDescription}>
							<FormLabel>Company Description</FormLabel>
							<Textarea rows={6} {...register("companyDescription")} />
							<FormErrorMessage>
								{errors.companyDescription && errors.companyDescription.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Button
						type="submit"
						size={"lg"}
						colorScheme="brand"
						fontSize={"md"}
						isDisabled={!isDirty || profileLoading}
						isLoading={updatingProfile}
					>
						Save
					</Button>
				</GridItem>
			</Grid>
		</Stack>
	)
}

function ContactForm() {
	const toast = useToast()

	const {
		register,
		formState: { errors, isDirty },
		handleSubmit,
		reset,
	} = useForm<EmployerContactSchema>({
		resolver: zodResolver(employerContactSchema),
	})

	const apiContext = api.useContext()

	const { data: currentProfile, isLoading: profileLoading } = api.employer.currentProfile.useQuery(undefined, {
		onSuccess: (data) => {
			if (data) {
				reset({
					city: data.city ?? "",
					country: data.country ?? "",
					pincode: data.pincode ?? "",
					state: data.state ?? "",
				})
			}
		},
	})

	const { mutate: updateContact, isLoading: updatingContact } = api.employer.updateContactDetails.useMutation({
		onSuccess: () => {
			toast({
				title: "Contact Updated",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

			void apiContext.employer.currentProfile.invalidate()
		},
	})

	const onSubmit: SubmitHandler<EmployerContactSchema> = (data) => {
		if (currentProfile) {
			updateContact({
				id: currentProfile.id,
				...data,
			})
		}
	}

	return (
		<Stack spacing={5} p={8} border={"1px"} borderColor={"gray.300"} borderRadius={"2xl"} boxShadow={"lg"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={600}>
					Contact Information
				</Text>
			</Box>

			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="country" isInvalid={!!errors.country}>
							<FormLabel>Country</FormLabel>
							<Input type="text" size="lg" {...register("country")} />
							<FormErrorMessage>{errors.country && errors.country.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="state" isInvalid={!!errors.state}>
							<FormLabel>State</FormLabel>
							<Input type="text" size="lg" {...register("state")} />
							<FormErrorMessage>{errors.state && errors.state.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					{" "}
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="city" isInvalid={!!errors.city}>
							<FormLabel>City</FormLabel>
							<Input type="text" size="lg" {...register("city")} />
							<FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					{" "}
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="pincode" isInvalid={!!errors.pincode}>
							<FormLabel>Pincode</FormLabel>
							<Input type="text" size="lg" {...register("pincode")} />
							<FormErrorMessage>{errors.pincode && errors.pincode.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Button
						type="submit"
						size={"lg"}
						colorScheme="brand"
						fontSize={"md"}
						isDisabled={!isDirty}
						isLoading={updatingContact}
					>
						Save
					</Button>
				</GridItem>
			</Grid>
		</Stack>
	)
}

function ChangePasswordForm() {
	return (
		<Stack spacing={5} p={8} border={"1px"} borderColor={"gray.300"} borderRadius={"2xl"} boxShadow={"lg"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={600}>
					Change Password
				</Text>
			</Box>

			<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={4}>
				<GridItem>
					<FormControl id="password">
						<FormLabel>Password</FormLabel>
						<Input type="password" size="lg" />

						<FormErrorMessage>{}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem>
					<FormControl id="confirmPassword">
						<FormLabel>Re-Password</FormLabel>
						<Input type="password" size="lg" />
						<FormErrorMessage>{}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem>
					<Button size={"lg"} colorScheme="brand" fontSize={"md"}>
						Save
					</Button>
				</GridItem>
			</Grid>
		</Stack>
	)
}
