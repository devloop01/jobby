import { forwardRef, type ReactNode } from "react"

import {
	Box,
	Container,
	Divider,
	Icon,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VisuallyHidden,
	chakra,
	useColorModeValue,
} from "@chakra-ui/react"
import { IconBrandInstagram, IconBrandTwitterFilled, IconBrandYoutube } from "@tabler/icons-react"

const ListHeader = ({ children }: { children: ReactNode }) => {
	return (
		<Text fontWeight={700} fontSize={"lg"} mb={2}>
			{children}
		</Text>
	)
}

export const Footer = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<Box bg={"gray.100"} color={"gray.700"} as="footer" ref={ref}>
			<Container as={Stack} maxW={"7xl"} py={10}>
				<SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }} spacing={8}>
					<Stack spacing={6}>
						<Box>
							<Text fontWeight={"bold"} color={"brand.500"} fontSize={"3xl"}>
								Jobby.
							</Text>
						</Box>
						<Text fontSize={"sm"}>Finding jobs made easy.</Text>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Product</ListHeader>
						<Link href={"#"}>Overview</Link>
						<Link href={"#"}>Features</Link>
						<Link href={"#"}>Tutorials</Link>
						<Link href={"#"}>Pricing</Link>
						<Link href={"#"}>Releases</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Company</ListHeader>
						<Link href={"#"}>About</Link>
						<Link href={"#"}>Press</Link>
						<Link href={"#"}>Careers</Link>
						<Link href={"#"}>Contact</Link>
						<Link href={"#"}>Partners</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<ListHeader>Support</ListHeader>
						<Link href={"#"}>Help Center</Link>
						<Link href={"#"}>Terms of Service</Link>
						<Link href={"#"}>Legal</Link>
						<Link href={"#"}>Privacy Policy</Link>
						<Link href={"#"}>Status</Link>
					</Stack>
				</SimpleGrid>

				<Divider borderColor={"gray.300"} py={4} />

				<FooterLinks />
			</Container>
		</Box>
	)
})

Footer.displayName = "Footer"

export default Footer

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
	return (
		<chakra.button
			bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
			rounded={"full"}
			w={8}
			h={8}
			cursor={"pointer"}
			as={"a"}
			href={href}
			display={"inline-flex"}
			alignItems={"center"}
			justifyContent={"center"}
			transition={"background 0.3s ease"}
			_hover={{
				bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	)
}

export function FooterLinks() {
	return (
		<Container
			as={Stack}
			maxW={"7xl"}
			py={4}
			direction={{ base: "column", md: "row" }}
			spacing={4}
			justify={{ base: "center", md: "space-between" }}
			align={{ base: "center", md: "center" }}
		>
			<Text>© 2023 Jobby. All rights reserved</Text>
			<Stack direction={"row"} spacing={6}>
				<SocialButton label={"Twitter"} href={"#"}>
					<Icon as={IconBrandTwitterFilled} />
				</SocialButton>
				<SocialButton label={"YouTube"} href={"#"}>
					<Icon as={IconBrandYoutube} />
				</SocialButton>
				<SocialButton label={"Instagram"} href={"#"}>
					<Icon as={IconBrandInstagram} />
				</SocialButton>
			</Stack>
		</Container>
	)
}
