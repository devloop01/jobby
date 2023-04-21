import { z } from "zod"

export const contactSchema = z.object({
	email: z.string().min(1, "Required").email(),
	name: z.string().min(1, "Required").max(100),
	message: z.string().min(50).max(1000),
})

export type ContactSchema = z.infer<typeof contactSchema>
