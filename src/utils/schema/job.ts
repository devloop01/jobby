import { z } from "zod"
import validator from "validator"

export const jobCreateSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	keyResponsibilities: z
		.array(z.object({ value: z.string() }))
		.min(1)
		.refine((arr) => arr.every((v) => v.value.length !== 0), { message: "Input cannot be empty" }),
	skillAndExperience: z
		.array(z.object({ value: z.string() }))
		.min(1)
		.refine((arr) => arr.every((v) => v.value.length !== 0), { message: "Input cannot be empty" }),
	location: z.string().min(1),
	hours: z.string().min(1).refine(validator.isNumeric, "Only Number Allowed"),
	salary: z.string().min(1).refine(validator.isNumeric, "Only Number Allowed"),
	expirationDate: z.string().min(1).refine(validator.isDate, "Invalid Date"),
	categories: z
		.array(
			z.object({
				label: z.string(),
				value: z.string(),
			})
		)
		.min(1),
})

export type JobCreateSchema = z.infer<typeof jobCreateSchema>
