import EmployerCard from "@/components/employer-card"
import RootLayout from "@/layouts/root-layout"
import { api } from "@/utils/api"
import { Box, Divider, Flex, Grid, GridItem, Heading, Select, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function Employers() {
	const { data: employers } = api.employer.find.useQuery()

	return (
		<>
			<Head>
				<title>Employers | Jobby</title>
			</Head>

			<RootLayout>
				<Box textAlign={"center"}>
					<Heading
						fontSize={"5xl"}
						fontWeight={900}
						bgGradient={"linear(to-r, blue.200, blue.500)"}
						bgClip="text"
					>
						Browse Companies
					</Heading>
					<Text fontSize={"lg"}>Find youself a pefect employer</Text>
				</Box>

				<Divider borderColor={"gray.300"} />

				<Stack my={6} spacing={6}>
					<Flex>
						<Stack>
							<Select>
								<option value="" disabled>
									Sort By
								</option>
								<option value="popular">Popular</option>
								<option value="ascending">A-Z</option>
								<option value="descending">Z-A</option>
							</Select>
						</Stack>
					</Flex>

					{employers && (
						<Grid templateColumns={{ md: "repeat(4, 1fr)" }} gap={4}>
							{employers.map((employer) => (
								<GridItem key={employer.id}>
									<EmployerCard employerId={employer.id} />
								</GridItem>
							))}
						</Grid>
					)}
				</Stack>
			</RootLayout>
		</>
	)
}
