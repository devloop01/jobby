import { employerContactSchema, employerProfileSchema } from "@/utils/schema/employer"
import { createTRPCRouter, employerProcedure, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { type PrismaClient } from "@prisma/client"

async function isEmployerProfileComplete(id: string, prisma: PrismaClient) {
	const employerProfile = await prisma.employerProfile.findUniqueOrThrow({
		where: { id },
		select: {
			companyName: true,
			companyPhone: true,
			companyEmail: true,
			companyWebsite: true,
			companyFoundedYear: true,
			companySize: true,
			companyAddress: true,
			companyDescription: true,
			country: true,
			city: true,
			state: true,
			pincode: true,
		},
	})

	const isAllFieldsSet = Object.values(employerProfile)
		.map((v) => Boolean(v))
		.every((v) => v === true)

	return isAllFieldsSet
}

async function markEmployerProfileCompleted(id: string, prisma: PrismaClient) {
	const isProfileComplete = await isEmployerProfileComplete(id, prisma)

	return await prisma.employerProfile.update({
		where: { id },
		data: {
			isComplete: isProfileComplete,
		},
	})
}

/**
 * User Routers
 * route: /api/trpc/employer
 */
export const employerRouter = createTRPCRouter({
	current: employerProcedure.query(async ({ ctx }) => {
		const employer = await ctx.prisma.employer.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return employer
	}),

	currentProfile: employerProcedure.query(async ({ ctx }) => {
		const employer = await ctx.prisma.employer.findFirst({
			where: { userId: ctx.session.user.id },
		})

		if (!employer) throw new Error("Employer does not Exist")

		const employerProfile = await ctx.prisma.employerProfile.findFirst({
			where: { employerId: employer.id },
		})

		return employerProfile
	}),

	find: publicProcedure.query(async ({ ctx }) => {
		return ctx.prisma.employer.findMany()
	}),

	findById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.employer.findUnique({
			where: { id: input },
		})
	}),

	findProfileByEmployerId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.employerProfile.findUniqueOrThrow({
			where: { employerId: input },
		})
	}),

	findAllApplicants: employerProcedure.query(async ({ ctx }) => {
		const employer = await ctx.prisma.employer.findUniqueOrThrow({
			where: { userId: ctx.session.user.id },
		})

		const candidateIds = await ctx.prisma.jobPosting.findMany({
			where: {
				employerId: employer.id,
			},
			select: {
				appliedByIds: true,
			},
		})

		const candidateIdsList = candidateIds.flatMap((o) => o.appliedByIds).filter((arr) => arr.length !== 0)

		const candidates = await ctx.prisma.candidate.findMany({
			where: {
				id: {
					in: candidateIdsList,
				},
			},
		})

		return candidates
	}),

	updateProfile: protectedProcedure
		.input(z.object({ id: z.string() }).merge(employerProfileSchema))
		.mutation(async ({ ctx, input: { id, ...profileData } }) => {
			const updatedProfile = await ctx.prisma.employerProfile.update({
				where: { id },
				data: {
					...profileData,
				},
				select: {
					companyName: true,
					companyPhone: true,
					companyEmail: true,
					companyWebsite: true,
					companyFoundedYear: true,
					companySize: true,
					companyAddress: true,
					companyDescription: true,
				},
			})

			await markEmployerProfileCompleted(id, ctx.prisma)

			return updatedProfile
		}),

	updateProfileImage: protectedProcedure
		.input(z.object({ id: z.string(), imageUrl: z.string().nullable() }))
		.mutation(async ({ ctx, input }) => {
			const updatedProfile = await ctx.prisma.employerProfile.update({
				where: { id: input.id },
				data: {
					companyImage: input.imageUrl,
					image: input.imageUrl,
				},
			})

			return updatedProfile
		}),

	updateContactDetails: protectedProcedure
		.input(z.object({ id: z.string() }).merge(employerContactSchema))
		.mutation(async ({ ctx, input: { id, ...profileData } }) => {
			const updatedProfile = await ctx.prisma.employerProfile.update({
				where: { id },
				data: {
					...profileData,
				},
				select: {
					country: true,
					city: true,
					state: true,
					pincode: true,
				},
			})

			await markEmployerProfileCompleted(id, ctx.prisma)

			return updatedProfile
		}),
})
