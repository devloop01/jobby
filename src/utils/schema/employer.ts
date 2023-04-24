import { z } from "zod"
import validator from "validator"

export const employerProfileSchema = z.object({
	companyName: z.string().min(1, "Company Name is required"),
	companyPhone: z
		.string()
		.min(1, "Phone is required")
		.refine((s) => validator.isMobilePhone(s, "en-IN"), { message: "Invalid Phone" }),
	companyEmail: z.string().min(1, "Email is required").email("Invalid email"),
	companyWebsite: z.string().min(1, "Website is required").url("Invalid URL"),
	companyFoundedYear: z.string().regex(new RegExp("^([0-9]{4})?$"), "Invalid Year").optional(),
	companySize: z.string().min(1, "Please select a value"),
	companyAddress: z.string().min(1, "Address is required"),
	companyDescription: z.string().max(1056).optional(),
	// socialLinks: z.array(
	// 	z.object({
	// 		label: z.string(),
	// 		href: z.string(),
	// 	})
	// ),
})

export const employerContactSchema = z.object({
	country: z.string().min(1, "required"),
	city: z.string().min(1, "required"),
	state: z.string().min(1, "required"),
	pincode: z.string().min(1, "required").max(6, "Invalid pincode"),
})

export type EmployerProfileSchema = z.infer<typeof employerProfileSchema>
export type EmployerContactSchema = z.infer<typeof employerContactSchema>
