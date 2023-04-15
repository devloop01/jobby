import { withAuth } from "next-auth/middleware"

const publicFileRegex = new RegExp(/\.(.*)$/)
const publicRoutes = [
	"/",
	"/sign-in",
	"/sign-up",
	"/sign-up/employer",
	"/auth/error",
	"/auth/verify-request",
	"/about",
	"/contact",
	"/careers",
	"/blog",
]

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
					publicRoutes.includes(pathname)
			)
		},
	},
	pages: {
		error: "/auth/error",
		signIn: "/sign-in",
		verifyRequest: "/auth/verify-request",
	},
})
