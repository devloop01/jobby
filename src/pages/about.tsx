import TeamCard, { type TeamMember } from "@/components/team-card"
import RootLayout from "@/layouts/root-layout"
import { Grid, GridItem, Heading, Stack, Text, Icon, Center, Container, Box } from "@chakra-ui/react"
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react"
import Head from "next/head"
import { type ReactNode } from "react"

const TEAM_MEMBERS: TeamMember[] = [
	{
		name: "Sikriti Dakua",
		role: "Frontend Developer",
		image: "/team/sikriti.png",
		socials: [
			{ label: "Linkedin", href: "/", icon: IconBrandLinkedin },
			{ label: "Facebook", href: "/", icon: IconBrandFacebook },
			{ label: "Twitter", href: "/", icon: IconBrandTwitter },
			{ label: "Instagram", href: "/", icon: IconBrandInstagram },
		],
	},

	{
		name: "Bishal Karjee",
		role: "Frontend Developer",
		image: "/team/bishal.jpg",
		socials: [
			{ label: "Linkedin", href: "/", icon: IconBrandLinkedin },
			{ label: "Facebook", href: "/", icon: IconBrandFacebook },
			{ label: "Twitter", href: "/", icon: IconBrandTwitter },
			{ label: "Instagram", href: "/", icon: IconBrandInstagram },
		],
	},

	{
		name: "Dipankar Roy",
		role: "Frontend Developer",
		image: "/team/dipankar.jpg",
		socials: [
			{ label: "Linkedin", href: "/", icon: IconBrandLinkedin },
			{ label: "Facebook", href: "/", icon: IconBrandFacebook },
			{ label: "Twitter", href: "/", icon: IconBrandTwitter },
			{ label: "Instagram", href: "/", icon: IconBrandInstagram },
		],
	},

	{
		name: "Sumit Saha",
		role: "Frontend Developer",
		image: "/team/sumitsaha.jpg",
		socials: [
			{ label: "Linkedin", href: "/", icon: IconBrandLinkedin },
			{ label: "Facebook", href: "/", icon: IconBrandFacebook },
			{ label: "Twitter", href: "/", icon: IconBrandTwitter },
			{ label: "Instagram", href: "/", icon: IconBrandInstagram },
		],
	},

	{
		name: "Debajyoti Haldar",
		role: "Frontend Developer",
		image: "/team/debajyoti.jpg",
		socials: [
			{ label: "Linkedin", href: "/", icon: IconBrandLinkedin },
			{ label: "Facebook", href: "/", icon: IconBrandFacebook },
			{ label: "Twitter", href: "/", icon: IconBrandTwitter },
			{ label: "Instagram", href: "/", icon: IconBrandInstagram },
		],
	},
]

export default function About() {
	return (
		<>
			<Head>
				<title>About Us | Jobby</title>
			</Head>

			<RootLayout>
				<Stack spacing={12} align={"center"}>
					<Container maxW={"4xl"} textAlign={"center"}>
						<Text fontWeight={700} color={"gray.400"}>
							OUR COMPANY
						</Text>
						<Heading fontSize={"4xl"}>About Our Company</Heading>
						<Stack py={2} spacing={4}>
							<Text>
								At <b>Jobby</b> we believe that a company&apos;s best strategic asset is its people. Our
								firm focuses on training individuals for the labour market and also helping companies to
								empower their staff with necessary training that will enable them give their best at
								work.
							</Text>
							<Text>
								Our training help companies increase employee retention by supporting staff development,
								value their existing talents and support with resources and product solutions that can
								help your team and company. Through partnerships with leading organizations and tutors /
								top HR professionals, we offer learning solutions that improve performance for both
								individuals and businesses, delivering company-wide impact
							</Text>
						</Stack>
					</Container>

					<Container maxW={"6xl"} textAlign={"center"}>
						<Text fontWeight={700} color={"gray.400"}>
							OUR COMPANY
						</Text>
						<Heading>Meet Our Team</Heading>

						<Grid templateColumns={{ sm: "repeat(3, 1fr)" }} gap={{ sm: 8 }} py={8}>
							{TEAM_MEMBERS.map((member) => (
								<GridItem key={member.name}>
									<Center>
										<TeamCard member={member} />
									</Center>
								</GridItem>
							))}
						</Grid>
					</Container>
				</Stack>
			</RootLayout>
		</>
	)
}
