import { candidateProfileSchema } from "@/utils/schema/candidate"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"

/**
 * User Routers
 * route: /api/trpc/candidate
 */
export const candidateRouter = createTRPCRouter({
	current: protectedProcedure.query(async ({ ctx }) => {
		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return candidate
	}),

	currentProfile: protectedProcedure.query(async ({ ctx }) => {
		const candidate = await ctx.prisma.candidate.findFirst({
			where: { userId: ctx.session.user.id },
		})

		if (!candidate) throw new Error("Candidate does not Exist")

		const candidateProfile = await ctx.prisma.candidateProfile.findFirst({
			where: { candidateId: candidate.id },
		})

		return candidateProfile
	}),

	updateProfile: protectedProcedure
		.input(z.object({ id: z.string() }).merge(candidateProfileSchema))
		.mutation(async ({ ctx, input: { id, skills, ...profileData } }) => {
			const updatedProfile = await ctx.prisma.candidateProfile.update({
				where: { id },
				data: {
					...profileData,
					skills: skills.map((skill) => skill.value),
				},
			})

			return updatedProfile
		}),

	// findSavedJobs: protectedProcedure
	// 	.input(
	// 		z.object({
	// 			candidateId: z.string(),
	// 		})
	// 	)
	// 	.query(async ({ ctx, input }) => {
	// 		const jobs = await ctx.prisma.jobPosting.findMany({
	// 			where: { candidateId: input.candidateId },
	// 		})

	// 		return jobs
	// 	}),

	findAllLikedJobs: protectedProcedure.query(async ({ ctx }) => {
		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return await ctx.prisma.jobPosting.findMany({
			where: {
				likedBy: {
					some: {
						id: candidate.id,
					},
				},
			},
		})
	}),

	likeJob: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const job = await ctx.prisma.jobPosting.findFirstOrThrow({
			where: { id: input },
		})

		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return await ctx.prisma.candidate.update({
			where: { id: candidate.id },
			data: {
				likedJobs: {
					connect: {
						id: job.id,
					},
				},
			},
		})
	}),

	unlikeJob: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const job = await ctx.prisma.jobPosting.findFirstOrThrow({
			where: { id: input },
		})

		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return await ctx.prisma.candidate.update({
			where: { id: candidate.id },
			data: {
				likedJobs: {
					disconnect: {
						id: job.id,
					},
				},
			},
		})
	}),

	toggleLikeJob: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const job = await ctx.prisma.jobPosting.findFirstOrThrow({
			where: { id: input },
		})

		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		const isLiked = job.likedByIds.some((id) => id === candidate.id)

		const connectOrDisconnect = isLiked ? "disconnect" : "connect"

		return await ctx.prisma.candidate.update({
			where: { id: candidate.id },
			data: {
				likedJobs: {
					[connectOrDisconnect]: {
						id: job.id,
					},
				},
			},
		})
	}),
})
