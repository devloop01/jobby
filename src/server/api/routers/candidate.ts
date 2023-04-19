import { candidateProfileSchema } from "@/utils/schema/candidate"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"

/**
 * User Routers
 * route: /api/trpc/candidate
 */
export const candidateRouter = createTRPCRouter({
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

	updateProfile: publicProcedure
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
})
