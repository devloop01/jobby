import { TRPCError } from "@trpc/server"
import { hash } from "argon2"

import { signUpSchema } from "@/utils/schema/auth"

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"

/**
 * User Routers
 * route: /api/trpc/user
 */
export const userRouter = createTRPCRouter({
	register: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
		const { firstName, lastName, email, password } = input
		const { prisma } = ctx

		const user = await prisma.user.findUnique({
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

		const newUser = await prisma.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					firstName,
					lastName,
					name,
					email,
					password: hashedPassword,
					passwordEnabled: true,
				},
			})

			const candidateProfile = await tx.candidateProfile.create({
				data: {
					email,
					fullName: name,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			})

			return user
		})

		return newUser
	}),

	registerEmployer: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
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

	current: protectedProcedure.query(async ({ ctx }) => {
		return ctx.prisma.user.findUnique({
			where: { id: ctx.session.user.id },
		})
	}),

	findByEmail: protectedProcedure.input(z.string().email()).query(async ({ ctx, input }) => {
		return ctx.prisma.user.findUnique({
			where: { email: input },
		})
	}),
})
