import NextLink from "next/link"
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Link,
	Button,
	FormErrorMessage,
	Text,
	InputGroup,
	InputRightElement,
	IconButton,
	Divider,
	Flex,
	useToast,
} from "@chakra-ui/react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

import { useState } from "react"
import { IconGoogle } from "../icons"

import { type LogInSchema, logInSchema } from "@/utils/schema/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

export const SignInForm = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [islogingIn, setIsLogingIn] = useState(false)

	const toast = useToast()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LogInSchema>({
		resolver: zodResolver(logInSchema),
	})

	const onSubmit: SubmitHandler<LogInSchema> = async (data) => {
		setIsLogingIn(true)

		const result = await signIn("credentials", { ...data, redirect: false })

		if (result && result.ok) {
			toast({
				title: "Logged In",
				status: "success",
				duration: 5000,
				isClosable: true,
			})
			void router.push("/")
		}

		if (result && result.error) {
			toast({
				title: "Invalid credentials",
				status: "error",
				duration: 5000,
				isClosable: true,
			})
		}

		setIsLogingIn(false)
	}

	return (
		<Box rounded={"lg"} bg={"white"} boxShadow={"xl"} border={"1px"} borderColor={"gray.200"} p={8}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel fontSize={"sm"}>Email address</FormLabel>
					<Input type="email" {...register("email")} />
					<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				</FormControl>

				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel fontSize={"sm"}>Password</FormLabel>
					<InputGroup>
						<Input type={showPassword ? "text" : "password"} {...register("password")} />
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

				<Stack spacing={5}>
					<Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
						{/* <Checkbox>Remember me</Checkbox> */}
						<Link as={NextLink} color={"blue.400"} href="/forgot-password">
							Forgot password?
						</Link>
					</Stack>
					<Button colorScheme={"brand"} type="submit" isLoading={islogingIn}>
						Sign in
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
					size={"lg"}
					variant={"outline"}
					leftIcon={<IconGoogle w={6} h={6} />}
					fontSize={"md"}
					onClick={() => void signIn("google")}
				>
					Continue with Google
				</Button>
			</Stack> */}
		</Box>
	)
}

export default SignInForm
