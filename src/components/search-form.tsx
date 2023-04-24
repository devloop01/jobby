import {
	Card,
	CardBody,
	Grid,
	GridItem,
	InputGroup,
	InputLeftElement,
	Icon,
	Input,
	Button,
	Select,
	FormControl,
	FormErrorMessage,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconSearch, IconMapPin, IconBriefcase } from "@tabler/icons-react"

import { useForm, type SubmitHandler } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
	jobTitle: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

interface SearchFormProps {
	onSearchPress?: (formData: FormSchema) => void
	text?: string
}

export function SearchForm({ onSearchPress, text }: SearchFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormSchema>({
		defaultValues: {
			jobTitle: text,
		},
		resolver: zodResolver(formSchema),
	})

	const onSubmit: SubmitHandler<FormSchema> = (data) => {
		onSearchPress?.(data)
	}

	return (
		<Card
			borderRadius={"lg"}
			border={"1px"}
			borderColor={"gray.300"}
			boxShadow={"lg"}
			w="full"
			as="form"
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onSubmit={handleSubmit(onSubmit)}
		>
			<CardBody p={8}>
				<Grid templateColumns={{ md: "repeat(12, 1fr)" }} gap={6}>
					<GridItem colSpan={10}>
						<FormControl id="jobTitle" isInvalid={!!errors.jobTitle}>
							<InputGroup>
								<InputLeftElement>
									<Icon as={IconSearch} color={!!errors.jobTitle ? "red.500" : "gray.500"} />
								</InputLeftElement>
								<Input
									{...register("jobTitle")}
									variant={"flushed"}
									placeholder="Job title"
									_placeholder={{ color: !!errors.jobTitle ? "red.500" : "gray.500" }}
								/>
							</InputGroup>
							<FormErrorMessage>{errors.jobTitle && errors.jobTitle.message}</FormErrorMessage>
						</FormControl>
					</GridItem>

					{/* <GridItem colSpan={2}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={IconMapPin} color={"gray.500"} />
							</InputLeftElement>
							<Input variant={"flushed"} placeholder="City or pincode" />
						</InputGroup>
					</GridItem>

					<GridItem colSpan={4}>
						<InputGroup>
							<InputLeftElement>
								<Icon as={IconBriefcase} color={"gray.500"} />
							</InputLeftElement>
							<Select placeholder="Choose a category" variant={"flushed"} pl={10}>
								<option value="freelance">freelance</option>
							</Select>
						</InputGroup>
					</GridItem> */}

					<GridItem colSpan={2}>
						<Button type="submit" w="full" size={"lg"} colorScheme="brand" fontSize={"md"}>
							Find Jobs
						</Button>
					</GridItem>
				</Grid>
			</CardBody>
		</Card>
	)
}

export default SearchForm
