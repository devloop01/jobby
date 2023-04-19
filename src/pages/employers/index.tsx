import EmployerCard from "@/components/employer-card"
import RootLayout from "@/layouts/root-layout"
import { Box, Divider, Flex, Grid, GridItem, Heading, Select, Stack, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function Employers() {
	return (
		<>
			<Head>
				<title>Employers | Jobby</title>
			</Head>

			<RootLayout>
				<Box py={12} textAlign={"center"}>
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

					<Grid templateColumns={{ md: "repeat(4, 1fr)" }} gap={4}>
						<GridItem>
							<EmployerCard />
						</GridItem>
						<GridItem>
							<EmployerCard />
						</GridItem>
						<GridItem>
							<EmployerCard />
						</GridItem>
						<GridItem>
							<EmployerCard />
						</GridItem>
					</Grid>
				</Stack>
			</RootLayout>
		</>
	)
}
