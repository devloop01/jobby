import { TRPCError } from "@trpc/server"
import { hash } from "argon2"

import { signUpSchema } from "@/utils/schema/auth"

import { createTRPCRouter, publicProcedure } from "../trpc"

/**
 * User Routers
 * route: /api/trpc/user
 */
export const userRouter = createTRPCRouter({
	register: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
		const { firstName, lastName, email, password } = input
		const { prisma } = ctx

		const user = await prisma.user.findFirst({
			where: { email },
		})

		if (user) {
			throw new TRPCError({
				code: "CONFLICT",
				message: "User already exists!",
			})
		}

		const name = [firstName, lastName].join(" ")

		const hashedPassword = await hash(password)

		const newUser = await ctx.prisma.user.create({
			data: {
				firstName,
				lastName,
				name,
				email,
				password: hashedPassword,
				passwordEnabled: true,
			},
		})

		return newUser
	}),
})
