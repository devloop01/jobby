import { getServerAuthSession } from "@/server/auth"
import { type GetServerSideProps, type GetServerSidePropsContext } from "next"

export function withAuth(gssp: GetServerSideProps): GetServerSideProps {
	return async (context: GetServerSidePropsContext) => {
		const session = await getServerAuthSession(context)

		if (!session) {
			return {
				redirect: {
					destination: "/sign-in",
					permanent: false,
				},
			}
		}

		const gsspData = await gssp(context)

		return {
			props: {
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				...("props" in gsspData && gsspData.props),
			},
		}
	}
}

export function isEmployer(gssp: GetServerSideProps): GetServerSideProps {
	return async (context: GetServerSidePropsContext) => {
		const session = await getServerAuthSession(context)

		if (!session || session.user.role === "CANDIDATE") {
			return {
				notFound: true,
			}
		}

		const gsspData = await gssp(context)

		return {
			props: {
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				...("props" in gsspData && gsspData.props),
			},
		}
	}
}
