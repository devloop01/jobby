import { type GetServerSidePropsContext } from "next"
import Head from "next/head"
import NextLink from "next/link"
import { Flex, Stack, Heading, Text, Link, useBreakpointValue } from "@chakra-ui/react"

import { getServerAuthSession } from "@/server/auth"

import CleanLayout from "@/layouts/clean-layout"
import SignUpEmployerForm from "@/components/auth/sign-up-employer-form"

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

function SignUpEmployer() {
	return (
		<>
			<Head>
				<title>Employer - Sign Up | Jobby</title>
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
							<Heading fontSize={"4xl"}>
								Create an{" "}
								<Text as="span" color={"brand.500"}>
									Employer
								</Text>{" "}
								Account
							</Heading>
							<Text>
								Already have an account{" "}
								<Link as={NextLink} href="/sign-in" color="blue.400">
									Login
								</Link>
							</Text>
						</Stack>
						<SignUpEmployerForm />
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
