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
} from "@chakra-ui/react"
import { z } from "zod"
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

import { useState } from "react"
import { IconGoogle } from "../icons"

const formSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email"),
	password: z.string().min(1, "Password is required"),
})

type FormSchemaType = z.infer<typeof formSchema>

export const SignInForm = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		console.log(data)
	}

	return (
		<Box rounded={"lg"} bg={"white"} boxShadow={"xl"} border={"1px"} borderColor={"gray.200"} p={8}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
				<FormControl id="email" isInvalid={!!errors.email}>
					<FormLabel>Email address</FormLabel>
					<Input type="email" {...register("email")} />
					<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
				</FormControl>

				<FormControl id="password" isInvalid={!!errors.password}>
					<FormLabel>Password</FormLabel>
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
					<Button
						bg={"blue.400"}
						color={"white"}
						_hover={{
							bg: "blue.500",
						}}
						type="submit"
						disabled={isSubmitting}
					>
						Sign in
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

export default SignInForm
