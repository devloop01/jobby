import SignUpForm from "@/components/auth/sign-up-form"
import CleanLayout from "@/layouts/clean-layout"
import { Flex, Stack, Heading, Text, Link, useBreakpointValue } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

function SignUpEmployer() {
	return (
		<>
			<Head>
				<title>Sign Up | Jobby</title>
			</Head>

			<CleanLayout>
				<Flex minH={"100vh"} align={"center"} justify={"center"}>
					<Stack
						spacing={8}
						mx={"auto"}
						minW={useBreakpointValue({ base: "auto", sm: "md" })}
						maxW={"lg"}
						py={12}
					>
						<Stack align={"center"}>
							<Heading fontSize={"4xl"}>Create an Account</Heading>
							<Text>
								Already have an account{" "}
								<Link as={NextLink} href="/sign-in" color="blue.400">
									Login
								</Link>
							</Text>
						</Stack>
						<SignUpForm />
						<Text align={"center"}>
							Are you a job seeker?{" "}
							<Link as={NextLink} href="/sign-up" color="blue.400">
								create a job seeker account
							</Link>
						</Text>
					</Stack>
				</Flex>
			</CleanLayout>
		</>
	)
}

export default SignUpEmployer
