import { z } from "zod"
import validator from "validator"

export const candidateProfileSchema = z.object({
	fullName: z.string().min(1),
	jobTitle: z.string().min(1),
	phone: z
		.string()
		.min(1)
		.refine((s) => validator.isMobilePhone(s, "en-IN")),
	email: z.string().min(1).email(),
	website: z.string().url().optional(),
	experienceInYears: z.string().optional(),
	age: z.string().min(1),
	skills: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
	showInListings: z.boolean(),
	bio: z.string().min(80).max(300),
})

export type CandidateProfileSchema = z.infer<typeof candidateProfileSchema>
