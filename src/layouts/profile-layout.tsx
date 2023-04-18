import type { ReactNode, FC } from "react"
import NextLink from "next/link"
import {
	Box,
	IconButton,
	Flex,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	type BoxProps,
	type FlexProps,
} from "@chakra-ui/react"
import { IconBookmarks, IconBriefcase, IconMenu, IconUser, type Icon as IconType } from "@tabler/icons-react"
import { useRouter } from "next/router"

type RootLayoutProps = {
	children: ReactNode
}

const ProfileLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<Box pos="relative">
			<ProfileSidebar>{children}</ProfileSidebar>
		</Box>
	)
}

export default ProfileLayout

interface LinkItemProps {
	name: string
	href?: string
	icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
	{ name: "My Profile", href: "/profile", icon: IconUser },
	{ name: "My Jobs", href: "/profile/applied-jobs", icon: IconBriefcase },
	{ name: "Saved Jobs", href: "/profile/saved-jobs", icon: IconBookmarks },
]

function ProfileSidebar({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Box minH={"100vh"}>
			<SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	)
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter()

	return (
		<Box
			bg={"white"}
			borderRight="1px"
			borderRightColor={"gray.200"}
			w={{ base: "full", md: 60 }}
			h="full"
			pos="absolute"
			{...rest}
		>
			{LinkItems.map((link) => (
				<NavItem href={link.href} key={link.name} icon={link.icon} isActive={router.asPath === link.href}>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

interface NavItemProps extends FlexProps {
	icon: IconType
	children: ReactNode
	href?: string
	isActive?: boolean
}
const NavItem = ({ href, icon, children, isActive, ...rest }: NavItemProps) => {
	return (
		<Link as={NextLink} href={href ?? "#"} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
			<Flex
				align="center"
				p="4"
				mx="4"
				mb="2"
				bg={isActive ? "blue.400" : "transparent"}
				color={isActive ? "white" : "black"}
				boxShadow={isActive ? "2xl" : "none"}
				borderRadius="lg"
				role="group"
				cursor="pointer"
				transitionProperty={"background, color"}
				transitionDuration={"150ms"}
				transitionTimingFunction={"ease-in-out"}
				_hover={{
					bg: "blue.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						transitionProperty={"stroke"}
						transitionDuration={"150ms"}
						transitionTimingFunction={"ease-in-out"}
						_groupHover={{
							stroke: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	)
}

interface MobileProps extends FlexProps {
	onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<IconMenu />} />

			<Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
				Logo
			</Text>
		</Flex>
	)
}
