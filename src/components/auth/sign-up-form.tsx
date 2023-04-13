import NextLink from "next/link"
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Text,
	useColorModeValue,
	Link,
	FormErrorMessage,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Portal,
	useDisclosure,
	Progress,
	List,
	ListIcon,
	ListItem,
	IconButton,
	useOutsideClick,
	Divider,
	Flex,
	useBreakpointValue,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { IconEye, IconEyeOff, IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react"
import { z } from "zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconGoogle } from "@/components/icons"

function checkPassword(password: string) {
	const uppercase = z.string().regex(new RegExp(".*[A-Z].*"), "One uppercase character")
	const lowercase = z.string().regex(new RegExp(".*[a-z].*"), "One lowercase character")
	const number = z.string().regex(new RegExp(".*\\d.*"), "One number")
	const specialCharacter = z
		.string()
		.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
	const length = z.string().min(8, "Must be at least 8 characters in length")

	const hasUppercase = uppercase.safeParse(password).success
	const hasLowercase = lowercase.safeParse(password).success
	const hasNumber = number.safeParse(password).success
	const hasSpecialCharacter = specialCharacter.safeParse(password).success
	const satisfiesLength = length.safeParse(password).success

	const progress =
		([hasUppercase, hasLowercase, hasNumber, hasSpecialCharacter, satisfiesLength].filter(Boolean).length / 5) * 100

	return {
		hasUppercase,
		hasLowercase,
		hasNumber,
		hasSpecialCharacter,
		satisfiesLength,
		progress,
	}
}

const formSchema = z
	.object({
		firstName: z.string().min(1, "First Name is required"),
		lastName: z.string().optional(),
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: z
			.string()
			.min(1, "Password is required")
			.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
			.regex(new RegExp(".*[a-z].*"), "One lowercase character")
			.regex(new RegExp(".*\\d.*"), "One number")
			.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character")
			.min(8, "Must be at least 8 characters in length"),
		confirmPassword: z.string().min(1, "Password confirmation is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	})

type FormSchemaType = z.infer<typeof formSchema>

export const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const poppverRef = useRef<HTMLElement | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	})

	const validatedPassword = checkPassword(watch("password"))

	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		console.log(data)
	}

	useOutsideClick({
		ref: poppverRef,
		handler: () => onClose(),
	})

	return (
		<Box rounded={"lg"} bg={"white"} boxShadow={"xl"} border={"1px"} borderColor={"gray.200"} p={8}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<Stack direction={useBreakpointValue({ base: "column", sm: "row" })} align={"start"}>
					<FormControl id="firstName" isInvalid={!!errors.firstName}>
						<FormLabel>First Name</FormLabel>
						<Input type="text" {...register("firstName")} />
						<FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
					</FormControl>
					<FormControl id="lastName" isInvalid={!!errors.lastName}>
						<FormLabel>Last Name</FormLabel>
						<Input type="text" {...register("lastName")} />
						<FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
					</FormControl>
				</Stack>

				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel>Email address</FormLabel>
					<Input type="email" {...register("email")} />
					<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				</FormControl>

				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel>Password</FormLabel>

					<InputGroup>
						<Popover
							returnFocusOnClose={false}
							isOpen={isOpen}
							onOpen={onOpen}
							onClose={onClose}
							closeOnBlur={false}
							initialFocusRef={passwordInputRef}
							isLazy
						>
							<PopoverTrigger>
								<Input
									type={showPassword ? "text" : "password"}
									{...register("password")}
									ref={(e) => {
										register("password").ref(e)
										passwordInputRef.current = e
									}}
								/>
							</PopoverTrigger>
							<Portal>
								<PopoverContent ref={poppverRef}>
									<PopoverArrow />
									<PopoverBody>
										<Stack>
											<Progress
												size={"sm"}
												value={validatedPassword.progress}
												rounded={"full"}
												colorScheme={
													validatedPassword.progress <= 40
														? "red"
														: validatedPassword.progress <= 60
														? "yellow"
														: "green"
												}
											/>
											<List>
												<ListItem>
													<ListIcon
														as={
															validatedPassword.hasUppercase
																? IconCircleCheckFilled
																: IconCircleXFilled
														}
														color={validatedPassword.hasUppercase ? "green.500" : "red.500"}
													/>
													1 Uppercase
												</ListItem>
												<ListItem>
													<ListIcon
														as={
															validatedPassword.hasLowercase
																? IconCircleCheckFilled
																: IconCircleXFilled
														}
														color={validatedPassword.hasLowercase ? "green.500" : "red.500"}
													/>
													1 Lowercase
												</ListItem>
												<ListItem>
													<ListIcon
														as={
															validatedPassword.hasSpecialCharacter
																? IconCircleCheckFilled
																: IconCircleXFilled
														}
														color={
															validatedPassword.hasSpecialCharacter
																? "green.500"
																: "red.500"
														}
													/>
													1 Special Character
												</ListItem>
												<ListItem>
													<ListIcon
														as={
															validatedPassword.hasNumber
																? IconCircleCheckFilled
																: IconCircleXFilled
														}
														color={validatedPassword.hasNumber ? "green.500" : "red.500"}
													/>
													1 Number
												</ListItem>
												<ListItem>
													<ListIcon
														as={
															validatedPassword.satisfiesLength
																? IconCircleCheckFilled
																: IconCircleXFilled
														}
														color={
															validatedPassword.satisfiesLength ? "green.500" : "red.500"
														}
													/>
													8 Characters
												</ListItem>
											</List>
										</Stack>
									</PopoverBody>
								</PopoverContent>
							</Portal>
						</Popover>
						<InputRightElement h={"full"}>
							<IconButton
								variant={"ghost"}
								aria-label="password reveal"
								icon={showPassword ? <IconEye size={16} /> : <IconEyeOff size={16} />}
								onClick={() => setShowPassword((showPassword) => !showPassword)}
							/>
						</InputRightElement>
					</InputGroup>

					<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
				</FormControl>

				<FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
					<FormLabel>Confirm Password</FormLabel>
					<InputGroup>
						<Input type={showPassword ? "text" : "password"} {...register("confirmPassword")} />
						<InputRightElement h={"full"}>
							<IconButton
								variant={"ghost"}
								aria-label="confirm password reveal"
								icon={showPassword ? <IconEye size={16} /> : <IconEyeOff size={16} />}
								onClick={() => setShowPassword((showPassword) => !showPassword)}
							/>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
				</FormControl>

				<Stack spacing={10} pt={2}>
					<Button
						loadingText="Submitting"
						size="lg"
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						type="submit"
						disabled={isSubmitting}
					>
						Sign up
					</Button>
				</Stack>
			</Stack>

			<Flex align={"center"} my={"6"}>
				<Divider borderColor={"gray.300"} />
				<Text fontSize={"sm"} px={"2"}>
					OR
				</Text>
				<Divider borderColor={"gray.300"} />
			</Flex>

			<Stack>
				<Button colorScheme="gray" leftIcon={<IconGoogle />} size="lg" fontSize={"md"}>
					Google
				</Button>
			</Stack>
		</Box>
	)
}

export default SignUpForm
