import { type GetServerSidePropsContext } from "next"

import Head from "next/head"
import NextLink from "next/link"

import { Flex, Heading, Link, Stack, Text, useBreakpointValue } from "@chakra-ui/react"

import { getServerAuthSession } from "@/server/auth"

import SignInForm from "@/components/auth/sign-in-form"
import CleanLayout from "@/layouts/clean-layout"

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerAuthSession(context)

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}

function SignIn() {
	return (
		<>
			<Head>
				<title>Sign In | Jobby</title>
			</Head>
			<CleanLayout>
				<Flex align={"center"} justify={"center"}>
					<Stack
						spacing={8}
						mx={"auto"}
						minW={useBreakpointValue({ base: "auto", sm: "md" })}
						maxW={"lg"}
						my={{ sm: 6, md: 16, lg: 24 }}
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
