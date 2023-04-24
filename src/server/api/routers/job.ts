import { createTRPCRouter, protectedProcedure, employerProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { jobCreateSchema } from "@/utils/schema/job"

/**
 * User Routers
 * route: /api/trpc/job
 */
export const jobRouter = createTRPCRouter({
	create: employerProcedure.input(jobCreateSchema).mutation(async ({ ctx, input }) => {
		const employer = await ctx.prisma.employer.findUniqueOrThrow({
			where: {
				userId: ctx.session.user.id,
			},
		})

		const employerProfile = await ctx.prisma.employerProfile.findUniqueOrThrow({
			where: {
				employerId: employer.id,
			},
		})

		const profileIsCompleted = employerProfile.isComplete

		if (!profileIsCompleted) throw new Error("Employer profile is not complete!")

		const newJob = await ctx.prisma.jobPosting.create({
			data: {
				...input,
				expirationDate: new Date(input.expirationDate).toISOString(),
				employerId: employer.id,
			},
		})

		return newJob
	}),

	delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
		const deletedJob = await ctx.prisma.jobPosting.delete({
			where: { id: input.id },
		})

		return deletedJob
	}),

	findAll: publicProcedure
		.input(
			z
				.object({
					jobTitle: z.string().optional(),
					limit: z.number().positive().default(10).optional(),
					sortBy: z.string().optional(),
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			try {
				const jobs = ctx.prisma.jobPosting.findMany({
					where: {
						title: {
							contains: input?.jobTitle ?? undefined,
							mode: "insensitive",
						},
					},
					orderBy: {
						createdAt: input?.sortBy === "latest" ? "desc" : undefined,
						title: input?.sortBy === "latest" ? undefined : input?.sortBy === "asc" ? "asc" : "desc",
					},
					take: input?.limit,
				})

				return jobs
			} catch (error) {
				throw new Error("Not Found!")
			}
		}),

	findById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.jobPosting.findUnique({
			where: { id: input },
		})
	}),

	findByEmployerId: publicProcedure
		.input(
			z.object({
				employerId: z.string(),
				limit: z.number().positive().default(10).optional(),
			})
		)
		.query(async ({ ctx, input }) => {
			return ctx.prisma.jobPosting.findMany({
				where: { employerId: input.employerId },
				take: input.limit,
				orderBy: {
					createdAt: "desc",
				},
			})
		}),

	likedByCandidate: publicProcedure
		.input(z.object({ candidateId: z.string().optional() }))
		.query(async ({ ctx, input }) => {
			const job = await ctx.prisma.jobPosting.findMany({
				where: {
					likedByIds: {
						has: input.candidateId,
					},
				},
			})

			return job
		}),
})
