import { createTRPCRouter } from "@/server/api/trpc"
import { userRouter } from "./routers/user"
import { candidateRouter } from "./routers/candidate"
import { jobRouter } from "./routers/job"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	candidate: candidateRouter,
	job: jobRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
