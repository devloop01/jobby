import { TRPCError } from "@trpc/server"
import { hash } from "argon2"

import { signUpEmployerSchema, signUpSchema } from "@/utils/schema/auth"

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

			const candidate = await tx.candidate.create({
				data: {
					email,
					firstName,
					lastName,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			})

			const candidateProfile = await tx.candidateProfile.create({
				data: {
					email,
					fullName: name,
					candidate: {
						connect: {
							id: candidate.id,
						},
					},
				},
			})

			return user
		})

		return newUser
	}),

	registerEmployer: publicProcedure.input(signUpEmployerSchema).mutation(async ({ input, ctx }) => {
		const { email, password } = input
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

		const hashedPassword = await hash(password)

		const newUser = await prisma.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					email,
					password: hashedPassword,
					passwordEnabled: true,
					role: "EMPLOYER",
				},
			})

			const employer = await tx.employer.create({
				data: {
					email,
					user: {
						connect: { id: user.id },
					},
				},
			})

			const employerProfile = await tx.employerProfile.create({
				data: {
					companyName: input.companyName,
					companySize: input.companySize,
					companyWebsite: input.companyWebsite,
					companyFoundedYear: input.companyFoundedYear,
					companyPhone: input.companyPhone,
					companyEmail: input.companyEmail,
					companyAddress: input.companyAddress,
					companyDescription: input.companyDescription,
					employer: {
						connect: {
							id: employer.id,
						},
					},
				},
			})

			return user
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
