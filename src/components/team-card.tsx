import {
	Heading,
	Avatar,
	Box,
	Image,
	Flex,
	Stack,
	useColorModeValue,
	HStack,
	IconButton,
	Icon,
} from "@chakra-ui/react"
import { type IconBrandLinkedin } from "@tabler/icons-react"

export interface TeamSocialLink {
	label: string
	href: string
	icon: typeof IconBrandLinkedin
}

export interface TeamMember {
	name: string
	role: string
	image?: string
	socials: TeamSocialLink[]
}

interface TeamCardProps {
	member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
	return (
		<Box
			maxW={"270px"}
			w={"full"}
			bg={useColorModeValue("white", "gray.800")}
			boxShadow={"2xl"}
			rounded={"md"}
			overflow={"hidden"}
		>
			<Box bg={"gray.300"} px={8}>
				<Image h={"120px"} w={"full"} src={"/inspiria.webp"} objectFit={"contain"} alt={"Author"} />
			</Box>
			<Flex justify={"center"} mt={-12}>
				<Avatar
					size={"xl"}
					src={member.image}
					css={{
						border: "2px solid white",
					}}
				/>
			</Flex>

			<Box p={6}>
				<Stack spacing={0} align={"center"} mb={5}>
					<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
						{member.name}
					</Heading>
					{/* <Text color={"gray.500"}>Frontend Developer</Text> */}
				</Stack>

				<HStack justify={"center"}>
					{member.socials.map((social) => (
						<IconButton
							key={social.label}
							aria-label={social.label}
							icon={<Icon as={social.icon} w={5} h={5} />}
							bg={"blue.600"}
							color={"white"}
							rounded={"md"}
							_hover={{
								transform: "translateY(-2px)",
								boxShadow: "lg",
							}}
						/>
					))}
				</HStack>
			</Box>
		</Box>
	)
}

export default TeamCard
