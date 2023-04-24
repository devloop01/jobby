import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useBreakpointValue,
	useDisclosure,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	MenuGroup,
	MenuDivider,
	Avatar,
	Portal,
	Badge,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { signOut, useSession } from "next-auth/react"
import NextLink from "next/link"
import { IconPlus, IconUser } from "@tabler/icons-react"
import { IconLogout } from "@tabler/icons-react"
import { forwardRef } from "react"

interface NavItem {
	label: string
	subLabel?: string
	children?: Array<NavItem>
	href?: string
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: "About",
		href: "/about",
	},
	{
		label: "FAQ's",
		href: "/faq",
	},
	{
		label: "Contact",
		href: "/contact",
	},
	{
		label: "Blog",
		href: "/blog",
	},
	{
		label: "Jobs",
		href: "/jobs",
	},
	// {
	// 	label: "Careers",
	// 	children: [
	// 		{
	// 			label: "Job Board",
	// 			subLabel: "Find your dream design job",
	// 			href: "#",
	// 		},
	// 		{
	// 			label: "Freelance Projects",
	// 			subLabel: "An exclusive list for contract work",
	// 			href: "#",
	// 		},
	// 	],
	// },
]

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
	const { isOpen, onToggle } = useDisclosure()

	const { data: sessionData } = useSession()

	return (
		<Box as="header" ref={ref}>
			<Flex
				bg={"white"}
				color={"gray.600"}
				minH={"100px"}
				py={{ base: 2 }}
				px={{ base: 6, md: 12 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={"gray.200"}
				align={"center"}
			>
				<Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align="center">
					<NextLink href={"/"}>
						<Text
							textAlign={useBreakpointValue({ base: "center", md: "left" })}
							fontWeight={"bold"}
							color={"brand.500"}
							fontSize={"3xl"}
						>
							Jobby.
						</Text>
					</NextLink>

					<Flex display={{ base: "none", md: "flex" }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				{sessionData ? (
					<Menu isLazy autoSelect={false}>
						<MenuButton aria-label="Options">
							<Avatar
								size={"sm"}
								name={sessionData.user.name ?? undefined}
								bg={sessionData.user.role === "EMPLOYER" ? "green.500" : "blue.500"}
							/>
						</MenuButton>
						<Portal>
							<MenuList boxShadow={"xl"} border={"1px"} borderColor={"gray.300"}>
								{sessionData.user.role === "EMPLOYER" && (
									<Box px={4}>
										<Badge size={"sm"} colorScheme="green">
											Company Account
										</Badge>
									</Box>
								)}
								<Box px={4} py={2}>
									<Text>{sessionData.user.name ?? ""}</Text>
									<Text fontSize={"sm"} color={"gray.500"}>
										{sessionData.user.email ?? ""}
									</Text>
								</Box>
								<MenuDivider />
								{sessionData.user.role === "EMPLOYER" && (
									<MenuGroup>
										<MenuItem
											as={NextLink}
											href="/jobs/create"
											fontSize={15}
											icon={<IconPlus size={16} />}
										>
											Create a Job
										</MenuItem>
									</MenuGroup>
								)}
								<MenuGroup>
									<MenuItem as={NextLink} href="/profile" fontSize={15} icon={<IconUser size={16} />}>
										Profile
									</MenuItem>
								</MenuGroup>
								<MenuDivider />
								<MenuGroup>
									<MenuItem
										fontSize={15}
										icon={<IconLogout size={16} />}
										onClick={() => void signOut()}
									>
										Logout
									</MenuItem>
								</MenuGroup>
							</MenuList>
						</Portal>
					</Menu>
				) : (
					<Stack justify={"flex-end"} direction={"row"} spacing={6}>
						<Button as={NextLink} href={"/sign-in"} variant={"link"} fontSize={"sm"} fontWeight={400}>
							Sign In
						</Button>
						<Button
							as={NextLink}
							href={"/sign-up"}
							display={{ base: "none", md: "inline-flex" }}
							colorScheme={"brand"}
							fontSize={"sm"}
						>
							Sign Up
						</Button>
					</Stack>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	)
})

Header.displayName = "Header"

export default Header

const DesktopNav = () => {
	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<Link
								as={NextLink}
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"sm"}
								fontWeight={500}
								color={"gray.600"}
								_hover={{
									textDecoration: "none",
									color: "gray.800",
								}}
							>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent border={0} boxShadow={"xl"} bg={"white"} p={4} rounded={"xl"} minW={"sm"}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	)
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<Link
			as={NextLink}
			href={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: "pink.50" }}
		>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text transition={"all .3s ease"} _groupHover={{ color: "pink.400" }} fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}
				>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	)
}

const MobileNav = () => {
	return (
		<Stack bg={"white"} p={4} display={{ md: "none" }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	)
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
			>
				<Text fontWeight={600} color={"gray.600"}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={"all .25s ease-in-out"}
						transform={isOpen ? "rotate(180deg)" : ""}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
				<Stack mt={2} pl={4} borderLeft={1} borderStyle={"solid"} borderColor={"gray.200"} align={"start"}>
					{children &&
						children.map((child) => (
							<Link as={NextLink} key={child.label} py={2} href={child.href}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	)
}
