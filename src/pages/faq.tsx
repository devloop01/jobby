import RootLayout from "@/layouts/root-layout"
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Container,
	Heading,
	Stack,
	Text,
} from "@chakra-ui/react"
import Head from "next/head"

export default function FAQ() {
	return (
		<>
			<Head>
				<title>{"FAQ's | Jobby"}</title>
			</Head>

			<RootLayout>
				<Stack spacing={12}>
					<Heading>Frequently Asked Questions</Heading>

					<Container maxW={"7xl"} as={Stack}>
						<Text fontSize={"2xl"} fontWeight={700}>
							Payments
						</Text>
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											{"Why won't my payment go through?"}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											How do I get a refund?
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Container>

					<Container maxW={"7xl"} as={Stack}>
						<Text fontSize={"2xl"} fontWeight={700}>
							Suggestions
						</Text>
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											{"Why won't my payment go through?"}
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>

							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex="1" textAlign="left">
											How do I get a refund?
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4}>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Container>
				</Stack>
			</RootLayout>
		</>
	)
}
