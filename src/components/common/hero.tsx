import Head from "next/head"
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react"

export default function Hero() {
	return (
		<Container maxW={"3xl"}>
			<Stack
				as={Box}
				textAlign={"center"}
				align={"center"}
				spacing={{ base: 4, md: 8 }}
				py={{ base: 20, md: 36 }}
			>
				<Heading fontWeight={700} fontSize={{ base: "4xl", md: "6xl" }} lineHeight={"110%"}>
					Finding Job{" "}
					<Text as={"span"} color={"brand.500"}>
						made easy
					</Text>
				</Heading>
				<Text color={"gray.500"}>
					Monetize your content by charging your most loyal readers and reward them loyalty points. Give back
					to your loyal readers by granting them access to your pre-releases and sneak-peaks.
				</Text>
				<Stack spacing={6} direction={"row"}>
					<Button rounded={"full"} px={6} colorScheme={"brand"}>
						Get started
					</Button>
					<Button rounded={"full"} px={6}>
						Learn more
					</Button>
				</Stack>
			</Stack>
		</Container>
	)
}
