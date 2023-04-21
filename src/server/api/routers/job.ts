import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"
import { jobCreateSchema } from "@/utils/schema/job"

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

	find: protectedProcedure.query(async ({ ctx }) => {
		return ctx.prisma.jobPosting.findMany()
	}),

	findById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.jobPosting.findUnique({
			where: { id: input },
		})
	}),

	findByEmployerId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.jobPosting.findFirst({
			where: { employerId: input },
		})
	}),
})
