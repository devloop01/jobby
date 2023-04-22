import { createTRPCRouter, protectedProcedure, employerProcedure } from "../trpc"
import { z } from "zod"
import { jobCreateSchema } from "@/utils/schema/job"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { TRPCClientError } from "@trpc/client"

/**
 * User Routers
 * route: /api/trpc/job
 */
export const jobRouter = createTRPCRouter({
	create: employerProcedure.input(jobCreateSchema).mutation(async ({ ctx, input }) => {
		const employer = await ctx.prisma.employer.findUniqueOrThrow({
			where: {
				id: ctx.session.user.id,
			},
		})

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

	find: protectedProcedure
		.input(
			z
				.object({
					jobTitle: z.string().min(1).optional(),
					limit: z.number().positive().default(10).optional(),
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
					take: input?.limit,
				})

				return jobs
			} catch (error) {
				throw new Error("Not Found!")
			}
		}),

	findById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.jobPosting.findUnique({
			where: { id: input },
		})
	}),

	findByEmployerId: protectedProcedure
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
			})
		}),

	likedByCandidate: protectedProcedure
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
