import { api } from "@/utils/api"
import { type ContactSchema, contactSchema } from "@/utils/schema/contact"
import {
	VStack,
	FormControl,
	FormLabel,
	InputGroup,
	Input,
	Textarea,
	Flex,
	Button,
	Box,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { useForm, type SubmitHandler } from "react-hook-form"

export default function ContactForm() {
	const toast = useToast()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactSchema>({
		resolver: zodResolver(contactSchema),
	})

	const { mutate: sendMail, isLoading: sendingMail } = api.contact.sendMail.useMutation({
		onSuccess: () => {
			toast({
				title: "Email Sent!",
				status: "success",
				duration: 4000,
				isClosable: true,
			})

			void router.push("/")
		},
		onError: () => {
			toast({
				title: "Failed to send email!",
				status: "error",
				duration: 4000,
				isClosable: true,
			})
		},
	})

	const onSubmit: SubmitHandler<ContactSchema> = (data) => {
		sendMail(data)
	}

	return (
		<Box bg="white" borderRadius="lg" boxShadow={"xl"}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<Box p={8} color="#0B0E3F" as="form" onSubmit={handleSubmit(onSubmit)}>
				<VStack spacing={5}>
					<FormControl id="email" isInvalid={!!errors.email}>
						<FormLabel>Email</FormLabel>
						<InputGroup borderColor="#E0E1E7">
							<Input
								type="email"
								placeholder="johndoe@email.com"
								_placeholder={{
									color: "gray.400",
									fontSize: "sm",
								}}
								size="md"
								{...register("email")}
								disabled={sendingMail}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
					</FormControl>

					<FormControl id="name" isInvalid={!!errors.name}>
						<FormLabel>Name</FormLabel>
						<InputGroup borderColor="#E0E1E7">
							<Input
								type="text"
								placeholder="John Doe"
								_placeholder={{
									color: "gray.400",
									fontSize: "sm",
								}}
								size="md"
								{...register("name")}
								disabled={sendingMail}
							/>
						</InputGroup>
						<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
					</FormControl>

					<FormControl id="message" isInvalid={!!errors.message}>
						<FormLabel>Message</FormLabel>
						<Textarea
							rows={6}
							placeholder="your message here"
							_placeholder={{
								color: "gray.400",
								fontSize: "sm",
							}}
							{...register("message")}
							disabled={sendingMail}
						/>
						<FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
					</FormControl>

					<FormControl>
						<Flex justify={"end"}>
							<Button type="submit" colorScheme={"brand"} fontSize={"sm"} isLoading={sendingMail}>
								Send Message
							</Button>
						</Flex>
					</FormControl>
				</VStack>
			</Box>
		</Box>
	)
}
