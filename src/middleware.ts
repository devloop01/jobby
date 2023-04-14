import { withAuth } from "next-auth/middleware"

const publicFileRegex = new RegExp(/\.(.*)$/)
const anonymousRoutes = ["/", "/sign-in", "/sign-up", "/auth/error", "/auth/verify-request"]

export default withAuth({
	callbacks: {
		authorized: ({ req }) => {
			const { pathname } = req.nextUrl
			return Boolean(
				req.cookies.get("next-auth.session-token") ||
					pathname.startsWith("/_next") ||
					pathname.startsWith("/api") ||
					pathname.startsWith("/static") ||
					publicFileRegex.test(pathname) ||
					anonymousRoutes.includes(pathname)
			)
		},
	},
	pages: {
		error: "/auth/error",
		signIn: "/sign-in",
		verifyRequest: "/auth/verify-request",
	},
})
