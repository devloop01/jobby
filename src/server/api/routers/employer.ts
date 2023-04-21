import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"

/**
 * User Routers
 * route: /api/trpc/employer
 */
export const employerRouter = createTRPCRouter({
	find: protectedProcedure.query(async ({ ctx }) => {
		return ctx.prisma.employer.findMany()
	}),

	findById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		return ctx.prisma.employer.findUnique({
			where: { id: input },
		})
	}),
})
