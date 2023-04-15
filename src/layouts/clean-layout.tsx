import type { ReactNode, FC } from "react"

import { Box, Container, Flex, Text } from "@chakra-ui/react"
import NextLink from "next/link"

type RootLayoutProps = {
	children: ReactNode
}

const Header: FC = () => {
	return (
		<Box as="header">
			<Flex
				bg={"white"}
				color={"gray.600"}
				minH={"60px"}
				py={{ base: 2 }}
				px={{ base: 12 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={"gray.200"}
				align={"center"}
			>
				<Flex align="center">
					<NextLink href={"/"}>
						<Text fontWeight={"bold"} color={"brand.500"} fontSize={"3xl"}>
							Jobby.
						</Text>
					</NextLink>
				</Flex>
			</Flex>
		</Box>
	)
}

const CleanLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<Box as="main">
			<Header />
			<Container maxW="1560px" as={"main"}>
				{children}
			</Container>
		</Box>
	)
}

export default CleanLayout
