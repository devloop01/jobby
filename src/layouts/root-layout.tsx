import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Box, Container } from "@chakra-ui/react"
import { useSize } from "@chakra-ui/react-use-size"
import { type ReactNode, type FC, useRef } from "react"

type RootLayoutProps = {
	children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	const headerRef = useRef<HTMLDivElement | null>(null)
	const footerRef = useRef<HTMLDivElement | null>(null)

	return (
		<Box>
			<Header ref={headerRef} />
			<Container as={"main"} maxW="1560px" minH={`calc(100vh - 450px)`} py={12}>
				{children}
			</Container>
			<Footer ref={footerRef} />
		</Box>
	)
}

export default RootLayout
