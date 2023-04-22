import { candidateProfileSchema } from "@/utils/schema/candidate"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCClientError } from "@trpc/client"

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
		.mutation(async ({ ctx, input: { id, ...profileData } }) => {
			const updatedProfile = await ctx.prisma.candidateProfile.update({
				where: { id },
				data: {
					...profileData,
				},
				select: {
					fullName: true,
					jobTitle: true,
					phone: true,
					email: true,
					website: true,
					experienceInYears: true,
					age: true,
					skills: true,
					showInListings: true,
					bio: true,
				},
			})

			const parsedProfile = candidateProfileSchema.safeParse(updatedProfile)

			if (parsedProfile.success)
				await ctx.prisma.candidateProfile.update({
					where: {
						id,
					},
					data: {
						isComplete: true,
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

	findAllAppliedJobs: protectedProcedure.query(async ({ ctx }) => {
		const candidate = await ctx.prisma.candidate.findFirstOrThrow({
			where: { userId: ctx.session.user.id },
		})

		return await ctx.prisma.jobPosting.findMany({
			where: {
				appliedBy: {
					some: {
						id: candidate.id,
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

		try {
			return await ctx.prisma.candidate.update({
				where: { userId: ctx.session.user.id },
				data: {
					likedJobs: {
						[connectOrDisconnect]: {
							id: job.id,
						},
					},
				},
			})
		} catch (error) {
			throw new Error("Cannot update candidate")
		}
	}),

	applyJob: protectedProcedure
		.input(
			z.object({
				jobId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const job = await ctx.prisma.jobPosting.findUniqueOrThrow({
				where: {
					id: input.jobId,
				},
			})

			const candidate = await ctx.prisma.candidate.findUniqueOrThrow({
				where: {
					userId: ctx.session.user.id,
				},
			})

			const candidateProfile = await ctx.prisma.candidateProfile.findUniqueOrThrow({
				where: {
					candidateId: candidate.id,
				},
			})

			const profileIsCompleted = candidateProfile.isComplete

			if (!profileIsCompleted) throw new TRPCClientError("candidate profile is not complete!")

			await ctx.prisma.candidate.update({
				where: {
					userId: ctx.session.user.id,
				},
				data: {
					appliedJobs: {
						connect: {
							id: job.id,
						},
					},
				},
			})
		}),
})
