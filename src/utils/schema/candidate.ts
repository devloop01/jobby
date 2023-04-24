import { z } from "zod"
import validator from "validator"

export const candidateProfileSchema = z.object({
	fullName: z.string().min(1, "required"),
	jobTitle: z.string().min(1, "required"),
	phone: z
		.string()
		.min(1, "required")
		.refine((s) => validator.isMobilePhone(s, "en-IN")),
	email: z.string().min(1, "required").email(),
	website: z.string().min(1, "required").url(),
	experienceInYears: z
		.string()
		.min(1, "required")
		.regex(/^0*([0-9]|[1-8][0-9]|9[0-9]|100)$/, "Year of experience cannot be more than 100"),
	age: z.string().min(1, "required"),
	skills: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		})
	),
	showInListings: z.boolean(),
	bio: z.string().min(80).max(300),
})

export const candidateContactSchema = z.object({
	country: z.string().min(1, "required"),
	city: z.string().min(1, "required"),
	state: z.string().min(1, "required"),
	pincode: z.string().min(1, "required").max(6, "Invalid pincode"),
})

export type CandidateProfileSchema = z.infer<typeof candidateProfileSchema>
export type CandidateContactSchema = z.infer<typeof candidateContactSchema>
