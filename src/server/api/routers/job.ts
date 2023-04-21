import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"
import { jobCreateSchema } from "@/utils/schema/job"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { TRPCClientError } from "@trpc/client"

/**
 * User Routers
 * route: /api/trpc/job
 */
export const jobRouter = createTRPCRouter({
	create: protectedProcedure.input(jobCreateSchema).mutation(async ({ ctx, input }) => {
		const newJob = await ctx.prisma.jobPosting.create({
			data: {
				...input,
				expirationDate: new Date(input.expirationDate).toISOString(),
				employerId: "644049876adcfd1a948ed76f",
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
				})
				.optional()
		)
		.query(async ({ ctx, input }) => {
			try {
				const jobs = ctx.prisma.jobPosting.findMany({
					where: {
						title: {
							contains: input?.jobTitle ?? undefined,
						},
					},
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
})
