import { Header } from "@/components/header"
import { Box, Container } from "@chakra-ui/react"
import type { ReactNode, FC } from "react"

type RootLayoutProps = {
	children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<Box>
			<Header />
			<Container maxW="1560px" as={"main"}>
				{children}
			</Container>
		</Box>
	)
}

export default RootLayout
