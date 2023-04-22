import ArticleList from "@/components/article-list"
import RootLayout from "@/layouts/root-layout"
import { Heading } from "@chakra-ui/react"
import Head from "next/head"

export default function Blog() {
	return (
		<>
			<Head>
				<title>Blog | Jobby</title>
			</Head>

			<RootLayout>
				<Heading>Our Blog</Heading>

				<ArticleList />
			</RootLayout>
		</>
	)
}
