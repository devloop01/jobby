import {
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Text,
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
	Alert,
	AlertIcon,
	AlertTitle,
	useToast,
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import { IconEye, IconEyeOff, IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react"
import { z } from "zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconGoogle } from "@/components/icons"

import { type SignUpSchema, signUpSchema } from "@/utils/schema/auth"
import { api } from "@/utils/api"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

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

export const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const poppverRef = useRef<HTMLElement | null>(null)

	const toast = useToast()
	const router = useRouter()

	const {
		mutate: registerUser,
		isLoading: registeringUser,
		isError: registerUserIsError,
		error: registerUserError,
	} = api.user.register.useMutation({
		onSuccess: () => {
			toast({
				title: "Account created.",
				description: "Successfully created your account.",
				status: "success",
				duration: 5000,
				isClosable: true,
			})

			void router.push("/sign-in")
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
	})

	const validatedPassword = checkPassword(watch("password"))

	const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
		registerUser(data)
	}

	useOutsideClick({
		ref: poppverRef,
		handler: () => onClose(),
	})

	return (
		<Box rounded={"lg"} bg={"white"} boxShadow={"xl"} border={"1px"} borderColor={"gray.200"} p={8}>
			{registerUserIsError && (
				<Alert status="error" mb={"6"}>
					<AlertIcon />
					<AlertTitle>{registerUserError.message}</AlertTitle>
				</Alert>
			)}

			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<Stack direction={useBreakpointValue({ base: "column", sm: "row" })} align={"start"}>
					<FormControl id="firstName" isInvalid={!!errors.firstName}>
						<FormLabel fontSize={"sm"}>First Name</FormLabel>
						<Input type="text" {...register("firstName")} />
						<FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
					</FormControl>
					<FormControl id="lastName" isInvalid={!!errors.lastName}>
						<FormLabel fontSize={"sm"}>Last Name</FormLabel>
						<Input type="text" {...register("lastName")} />
						<FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
					</FormControl>
				</Stack>

				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel fontSize={"sm"}>Email address</FormLabel>
					<Input type="email" {...register("email")} />
					<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				</FormControl>

				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel fontSize={"sm"}>Password</FormLabel>

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
					<FormLabel fontSize={"sm"}>Confirm Password</FormLabel>
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
					<Button type="submit" colorScheme={"brand"} w={"full"} isLoading={registeringUser}>
						Sign up
					</Button>
				</Stack>
			</Stack>

			{/* <Flex align={"center"} my={"6"}>
				<Divider borderColor={"gray.300"} />
				<Text fontSize={"sm"} px={"2"}>
					OR
				</Text>
				<Divider borderColor={"gray.300"} />
			</Flex>

			<Stack>
				<Button
					size="lg"
					variant={"outline"}
					leftIcon={<IconGoogle />}
					fontSize={"md"}
					onClick={() => void signIn("google")}
				>
					Continue with Google
				</Button>
			</Stack> */}
		</Box>
	)
}

export default SignUpForm
