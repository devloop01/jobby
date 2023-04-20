import Head from "next/head"

import { withAuth } from "@/utils"

import RootLayout from "@/layouts/root-layout"
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
	Image,
	Input,
	Radio,
	RadioGroup,
	Skeleton,
	Stack,
	Text,
	Textarea,
	useToast,
} from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import ProfileLayout from "@/layouts/profile-layout"
import { CreatableSelect } from "chakra-react-select"
import { useState } from "react"
import { useForm, type SubmitHandler, Controller } from "react-hook-form"
import { api } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { type CandidateProfileSchema, candidateProfileSchema } from "@/utils/schema/candidate"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withAuth(async () => {
	return {
		props: {},
	}
})

export default function Profile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>Profile | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<ProfileLayout>
						<Stack px={{ base: 6, md: 12 }} spacing={6}>
							<Heading as="h2" size="lg">
								My Profile
							</Heading>

							<ProfileForm />

							<ContactForm />

							<ChangePasswordForm />
						</Stack>
					</ProfileLayout>
				</Stack>
			</RootLayout>
		</>
	)
}

function ProfileForm() {
	const [showInListings, setShowInListings] = useState(true)

	const toast = useToast()

	const {
		register,
		control,
		formState: { errors, isDirty },
		handleSubmit,
		reset,
	} = useForm<CandidateProfileSchema>({
		resolver: zodResolver(candidateProfileSchema),
	})

	const apiContext = api.useContext()

	const { data: currentProfile, isLoading: profileLoading } = api.candidate.currentProfile.useQuery(undefined, {
		onSuccess: (data) => {
			if (data) {
				reset({
					fullName: data.fullName,
					jobTitle: data.jobTitle ?? "",
					phone: data.phone ?? "",
					email: data.email,
					website: data.website ?? "",
					experienceInYears: data.experienceInYears ?? "",
					age: data.age ?? "",
					skills: data.skills.map((v) => ({ label: v, value: v })),
					bio: data.bio ?? "",
					showInListings: data.showInListings,
				})
			}
		},
	})

	const { mutate: updateProfile } = api.candidate.updateProfile.useMutation({
		onSuccess: () => {
			toast({
				title: "Profile Updated",
				status: "success",
				duration: 3000,
				isClosable: true,
			})

			void apiContext.candidate.currentProfile.invalidate()
		},
	})

	const onSubmit: SubmitHandler<CandidateProfileSchema> = (data) => {
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
				<Skeleton isLoaded={!profileLoading}>
					<Stack>
						<Image
							boxSize="180px"
							objectFit="cover"
							src="https://bit.ly/dan-abramov"
							alt="Dan Abramov"
							borderRadius={12}
						/>
						<Flex gap={3}>
							<Button colorScheme="brand" size="xs">
								Upload Avatar
							</Button>
							<Button colorScheme="red" size="xs">
								Delete
							</Button>
						</Flex>
					</Stack>
				</Skeleton>

				<Text fontSize={"sm"} color={"gray.500"}>
					Max file size is 1MB, Minimum dimension: 330x300 And Suitable files are .jpg & .png
				</Text>
			</Stack>
			<Divider />
			{/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="fullName" isInvalid={!!errors.fullName}>
							<FormLabel>Full Name</FormLabel>
							<Input type="text" size="lg" {...register("fullName")} />
							<FormErrorMessage>{errors.fullName && errors.fullName.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="jobTitle" isInvalid={!!errors.jobTitle}>
							<FormLabel>Job Title</FormLabel>
							<Input type="text" size="lg" {...register("jobTitle")} />
							<FormErrorMessage>{errors.jobTitle && errors.jobTitle.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="phone" isInvalid={!!errors.phone}>
							<FormLabel>Phone</FormLabel>
							<Input type="text" size="lg" {...register("phone")} />
							<FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="email" isInvalid={!!errors.email}>
							<FormLabel>Email address</FormLabel>
							<Input type="email" size="lg" {...register("email")} />
							<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="website" isInvalid={!!errors.website}>
							<FormLabel>Website</FormLabel>
							<Input type="text" size="lg" {...register("website")} />
							<FormErrorMessage>{errors.website && errors.website.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="experienceInYears" isInvalid={!!errors.experienceInYears}>
							<FormLabel>Experience (In Years)</FormLabel>
							<Input type="text" size="lg" {...register("experienceInYears")} />
							<FormErrorMessage>
								{errors.experienceInYears && errors.experienceInYears.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="age" isInvalid={!!errors.age}>
							<FormLabel>Age</FormLabel>
							<Input type="text" size="lg" {...register("age")} />
							<FormErrorMessage>{errors.age && errors.age.message}</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<Controller
							control={control}
							name="skills"
							render={({ field: { onChange, onBlur, value, name, ref } }) => (
								<FormControl isInvalid={!!errors.skills} id="skills">
									<FormLabel>Select your skills</FormLabel>
									<CreatableSelect
										size="lg"
										isMulti
										name={name}
										ref={ref}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										options={[
											{ value: "angular", label: "Angular" },
											{ value: "react", label: "React" },
										]}
										placeholder="E.g. Angular, React..."
										closeMenuOnSelect={false}
									/>

									<FormErrorMessage>{errors.skills && errors.skills.message}</FormErrorMessage>
								</FormControl>
							)}
						/>
					</Skeleton>
				</GridItem>

				<GridItem>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="showInListings" isInvalid={!!errors.showInListings}>
							<FormLabel>Allow In Search & Listing</FormLabel>
							<RadioGroup
								onChange={(value) => {
									setShowInListings(() => value === "yes")
								}}
								value={showInListings ? "yes" : "no"}
							>
								<Stack direction="row">
									<Radio value="yes">Yes</Radio>
									<Radio value="no">No</Radio>
								</Stack>
							</RadioGroup>
							<FormErrorMessage>
								{errors.showInListings && errors.showInListings.message}
							</FormErrorMessage>
						</FormControl>
					</Skeleton>
				</GridItem>

				<GridItem colSpan={2}>
					<Skeleton isLoaded={!profileLoading}>
						<FormControl id="bio" isInvalid={!!errors.bio}>
							<FormLabel>Bio</FormLabel>
							<Textarea rows={6} {...register("bio")} />
							<FormErrorMessage>{errors.bio && errors.bio.message}</FormErrorMessage>
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
						// isLoading={updatingCandidateProfile}
					>
						Save
					</Button>
				</GridItem>
			</Grid>
		</Stack>
	)
}

function ContactForm() {
	return (
		<Stack spacing={5} p={8} border={"1px"} borderColor={"gray.300"} borderRadius={"2xl"} boxShadow={"lg"}>
			<Box>
				<Text fontSize={"2xl"} fontWeight={600}>
					Contact Information
				</Text>
			</Box>

			<Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={4}>
				<GridItem>
					<FormControl id="country">
						<FormLabel>Country</FormLabel>
						<Input type="text" size="lg" />
						<FormErrorMessage>{}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem>
					<FormControl id="state">
						<FormLabel>State</FormLabel>
						<Input type="text" size="lg" />
						<FormErrorMessage>{}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem>
					<FormControl id="city">
						<FormLabel>City</FormLabel>
						<Input type="text" size="lg" />
						<FormErrorMessage>{}</FormErrorMessage>
					</FormControl>
				</GridItem>

				<GridItem>
					<FormControl id="pincode">
						<FormLabel>Pincode</FormLabel>
						<Input type="text" size="lg" />
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
