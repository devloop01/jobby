import SignInForm from "@/components/auth/sign-in-form"
import CleanLayout from "@/layouts/clean-layout"
import { Flex, Heading, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

function SignIn() {
	return (
		<>
			<Head>
				<title>Sign In | Jobby</title>
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
							<Heading fontSize={"4xl"}>Welcome back!</Heading>
							<Text>
								Do not have an account yet?{" "}
								<Link as={NextLink} href="/sign-up" color="blue.400">
									Create account
								</Link>
							</Text>
						</Stack>
						<SignInForm />
					</Stack>
				</Flex>
			</CleanLayout>
		</>
	)
}

export default SignIn
