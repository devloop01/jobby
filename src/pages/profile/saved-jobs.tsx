import Head from "next/head"

import { withAuth } from "@/utils"

import RootLayout from "@/layouts/root-layout"
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
	GridItem,
	Heading,
	Icon,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	StackDivider,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	Textarea,
	useBreakpointValue,
} from "@chakra-ui/react"
import { type InferGetServerSidePropsType } from "next"
import ProfileLayout from "@/layouts/profile-layout"
import { IconSearch } from "@tabler/icons-react"
import { CreatableSelect } from "chakra-react-select"
import { useState } from "react"

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = withAuth(async () => {
	return {
		props: {},
	}
})

export default function Profile({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>Profile | Jobby</title>
			</Head>

			<RootLayout>
				<Stack py={{ base: 6, md: 12 }}>
					<ProfileLayout>
						<Stack px={{ base: 6, md: 12 }}>
							<Heading as="h2" size="lg">
								Saved Jobs
							</Heading>
						</Stack>
					</ProfileLayout>
				</Stack>
			</RootLayout>
		</>
	)
}
