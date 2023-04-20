import { Footer } from "@/components/footer"
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
			<Container as={"main"} maxW="1560px" minH={"calc(100vh - 100px)"} py={12}>
				{children}
			</Container>
			<Footer />
		</Box>
	)
}

export default RootLayout
