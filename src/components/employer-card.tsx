import { useState } from "react"
import {
	Box,
	Heading,
	Text,
	Img,
	Flex,
	HStack,
	Card,
	IconButton,
	Icon,
	Stack,
	Badge,
	Button,
	LinkBox,
} from "@chakra-ui/react"
import {
	IconArrowUpRight,
	IconHeartFilled,
	IconHeart,
	IconBookmark,
	IconBriefcase,
	IconMapPin,
	IconClock,
	IconCash,
	IconMoneybag,
	IconCoinRupee,
} from "@tabler/icons-react"
import Image from "next/image"
import NextLink from "next/link"

export function EmployerCard() {
	const [liked, setLiked] = useState(false)

	return (
		<Card
			rounded={"sm"}
			overflow={"hidden"}
			bg="white"
			border={"1px"}
			borderColor={"gray.300"}
			transitionProperty={"transform, box-shadow"}
			transitionDuration={"100ms"}
			transitionTimingFunction={"ease-in-out"}
			_hover={{
				transform: "translateY(-3px)",
				boxShadow: "lg",
			}}
		>
			<Stack p={6}>
				<Stack align={"center"} textAlign={"center"}>
					<Image src={"./google.svg"} height={64} width={64} alt={"Company Avatar"} />

					<Box>
						<NextLink
							href={{
								pathname: "/employers/[employerId]",
								query: { employerId: "random-id" },
							}}
						>
							<Text fontSize={"xl"} fontWeight={600} _hover={{ color: "blue.500" }}>
								Google
							</Text>
						</NextLink>

						<HStack color={"gray.500"}>
							<Icon as={IconMapPin} />
							<Text>New Delhi</Text>
						</HStack>
					</Box>

					<Button
						as={NextLink}
						href={{
							pathname: "/employers/[employerId]/jobs",
							query: { employerId: "random-id" },
						}}
					>
						12 Jobs Open
					</Button>
				</Stack>
			</Stack>
		</Card>
	)
}

export default EmployerCard
