import { type GetServerSidePropsContext } from "next"
import { getServerSession, type NextAuthOptions, type DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/server/db"
import { logInSchema } from "@/utils/schema/auth"
import { verify } from "argon2"
import { type UserRole, type User } from "@prisma/client"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string
			// ...other properties
			role: UserRole
		} & DefaultSession["user"]
	}

	interface User {
		// ...other properties
		role: UserRole
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "johndoe@test.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "password",
				},
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await logInSchema.parseAsync(credentials)

					const user = await prisma.user.findFirst({
						where: { email },
					})

					if (!user) return null

					if (!user.passwordEnabled || !user.password) return null

					const isValidPassword = await verify(user.password, password)

					if (!isValidPassword) {
						return null
					}

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						firstName: user.firstName,
						lastName: user.lastName,
						role: user.role,
					}
				} catch (error) {
					return null
				}
			},
		}),
	],

	session: {
		strategy: "jwt",
	},
	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.role = user.role
				// token.firstName = user.firstName
				// token.lastName = user.lastName
			}
			return token
		},
		session: ({ session, token }) => {
			if (session.user) {
				session.user.id = token.id as User["id"]
				// session.user.firstName = token.firstName
				// session.user.lastName = token.lastName
				session.user.role = token.role as UserRole
			}
			return session
		},
	},
	pages: {
		signIn: "/sign-in",
		newUser: "/sign-up",
	},
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions)
}
