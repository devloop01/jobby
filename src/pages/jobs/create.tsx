import RootLayout from "@/layouts/root-layout"
import {
	Alert,
	AlertTitle,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Icon,
	IconButton,
	Input,
	Stack,
	Textarea,
	useBreakpointValue,
	useToast,
} from "@chakra-ui/react"
import { type GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useForm, useFieldArray, type SubmitHandler, Controller } from "react-hook-form"

import { jobCreateSchema, type JobCreateSchema } from "@/utils/schema/job"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconPlus, IconX } from "@tabler/icons-react"
import { api } from "@/utils/api"
import { isEmployer } from "@/utils"
import { CreatableSelect } from "chakra-react-select"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = isEmployer(async (context: GetServerSidePropsContext) => {
	return {
		props: {},
	}
})

export default function CreateJob() {
	const toast = useToast()

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<JobCreateSchema>({
		defaultValues: {
			keyResponsibilities: [{ value: "" }],
			skillAndExperience: [{ value: "" }],
		},
		resolver: zodResolver(jobCreateSchema),
	})

	const {
		fields: keyResponsibilitiesFields,
		append: appendKeyResponsibilities,
		remove: removeKeyResponsibilities,
	} = useFieldArray<JobCreateSchema>({
		control,
		name: "keyResponsibilities",
	})

	const {
		fields: skillAndExperienceFields,
		append: appendSkillAndExperience,
		remove: removeSkillAndExperience,
	} = useFieldArray<JobCreateSchema>({
		control,
		name: "skillAndExperience",
	})

	const {
		mutate: createJob,
		isLoading: creatingJob,
		error: createJobError,
	} = api.job.create.useMutation({
		onSuccess: () => {
			toast({
				title: "Job Created",
				duration: 5000,
				status: "success",
				isClosable: true,
			})

			reset()
		},
	})

	const onSubmit: SubmitHandler<JobCreateSchema> = (data) => {
		createJob(data)
	}

	return (
		<>
			<Head>
				<title>Create a Job | Jobby</title>
			</Head>

			<RootLayout>
				<Stack>
					<Heading>Create a Job for employers</Heading>

					{createJobError && (
						<Alert status="error">
							<AlertTitle>{createJobError.message}</AlertTitle>
						</Alert>
					)}

					<Stack
						p={6}
						spacing={4}
						as="form"
						// eslint-disable-next-line @typescript-eslint/no-misused-promises
						onSubmit={handleSubmit(onSubmit)}
						bg="gray.100"
						borderRadius={"md"}
						border={"1px"}
						borderColor={"gray.300"}
					>
						<FormControl id="title" isInvalid={!!errors.title}>
							<FormLabel>Title</FormLabel>
							<Input bg="white" borderColor={"gray.300"} {...register("title")} />
							<FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
						</FormControl>

						<FormControl id="description" isInvalid={!!errors.description}>
							<FormLabel>Job Desciption</FormLabel>
							<Textarea bg="white" borderColor={"gray.300"} rows={6} {...register("description")} />
							<FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
						</FormControl>

						<Controller
							control={control}
							name="categories"
							render={({ field: { onChange, onBlur, value, name, ref } }) => (
								<FormControl isInvalid={!!errors.categories} id="categories">
									<FormLabel>Job Categories</FormLabel>
									<CreatableSelect
										variant="outline"
										isMulti
										name={name}
										ref={ref}
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										options={[
											{ value: "Frontend", label: "Frontend" },
											{ value: "Backend", label: "backend" },
											{ value: "Designer", label: "designer" },
											{ value: "Teacher", label: "teacher" },
										]}
										placeholder="E.g. frontend, backend..."
										closeMenuOnSelect={false}
									/>

									<FormErrorMessage>
										{errors.categories && errors.categories.message}
									</FormErrorMessage>
								</FormControl>
							)}
						/>

						<FormControl id="keyResponsibilities" isInvalid={!!errors.keyResponsibilities}>
							<FormLabel>Key Responsibilities</FormLabel>
							<Stack>
								{keyResponsibilitiesFields.map((field, index) => (
									<HStack key={field.id}>
										<Input
											bg="white"
											borderColor={"gray.300"}
											{...register(`keyResponsibilities.${index}.value` as const)}
										/>
										<IconButton
											aria-label="Remove"
											icon={<Icon as={IconX} />}
											colorScheme={"red"}
											onClick={() => {
												removeKeyResponsibilities(index)
											}}
										/>
									</HStack>
								))}

								<Flex>
									<IconButton
										aria-label="Add"
										icon={<Icon as={IconPlus} />}
										colorScheme={"brand"}
										onClick={() => {
											appendKeyResponsibilities({ value: "" })
										}}
									/>
								</Flex>
								<FormErrorMessage>
									{errors.keyResponsibilities && errors.keyResponsibilities.message}
								</FormErrorMessage>
							</Stack>
						</FormControl>

						<FormControl id="skillAndExperience" isInvalid={!!errors.skillAndExperience}>
							<FormLabel>Skill & Experience</FormLabel>
							<Stack>
								{skillAndExperienceFields.map((field, index) => (
									<HStack key={field.id}>
										<Input
											bg="white"
											borderColor={"gray.300"}
											{...register(`skillAndExperience.${index}.value` as const)}
										/>
										<IconButton
											aria-label="Remove"
											icon={<Icon as={IconX} />}
											colorScheme={"red"}
											onClick={() => {
												removeSkillAndExperience(index)
											}}
										/>
									</HStack>
								))}

								<Flex>
									<IconButton
										aria-label="Add"
										icon={<Icon as={IconPlus} />}
										colorScheme={"brand"}
										onClick={() => {
											appendSkillAndExperience({ value: "" })
										}}
									/>
								</Flex>
								<FormErrorMessage>
									{errors.skillAndExperience && errors.skillAndExperience.message}
								</FormErrorMessage>
							</Stack>
						</FormControl>

						<Stack direction={useBreakpointValue({ base: "column", sm: "row" })} align={"start"}>
							<FormControl id="location" isInvalid={!!errors.location}>
								<FormLabel>Location</FormLabel>
								<Input bg="white" borderColor={"gray.300"} {...register("location")} />
								<FormErrorMessage>{errors.location && errors.location.message}</FormErrorMessage>
							</FormControl>

							<FormControl id="hours" isInvalid={!!errors.hours}>
								<FormLabel>Required Hours (Per Week)</FormLabel>
								<Input bg="white" borderColor={"gray.300"} {...register("hours")} />
								<FormErrorMessage>{errors.hours && errors.hours.message}</FormErrorMessage>
							</FormControl>
						</Stack>

						<Stack direction={useBreakpointValue({ base: "column", sm: "row" })} align={"start"}>
							<FormControl id="salary" isInvalid={!!errors.salary}>
								<FormLabel>Salary (In Rs)</FormLabel>
								<Input bg="white" borderColor={"gray.300"} {...register("salary")} />
								<FormErrorMessage>{errors.salary && errors.salary.message}</FormErrorMessage>
							</FormControl>

							<FormControl id="expirationDate" isInvalid={!!errors.expirationDate}>
								<FormLabel>Expiration Date</FormLabel>
								<Input
									bg="white"
									borderColor={"gray.300"}
									type="date"
									{...register("expirationDate")}
								/>
								<FormErrorMessage>
									{errors.expirationDate && errors.expirationDate.message}
								</FormErrorMessage>
							</FormControl>
						</Stack>

						<Stack spacing={10} pt={2}>
							<Button type="submit" colorScheme={"brand"} w={"full"} isLoading={creatingJob}>
								Create job
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</RootLayout>
		</>
	)
}
