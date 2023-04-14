import z from "zod"

export const signUpSchema = z
	.object({
		firstName: z.string().min(1, "First Name is required"),
		lastName: z.string().optional(),
		email: z.string().min(1, "Email is required").email("Invalid email"),
		password: z
			.string()
			.min(1, "Password is required")
			.regex(new RegExp(".*[A-Z].*"), "Password must contain 1 uppercase character")
			.regex(new RegExp(".*[a-z].*"), "Password must contain 1 lowercase character")
			.regex(new RegExp(".*\\d.*"), "Password must contain 1 number")
			.regex(
				new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
				"Password must contain 1 special character"
			)
			.min(8, "Password must be at least 8 characters in length"),
		confirmPassword: z.string().min(1, "Password confirmation is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords do not match",
	})

export const logInSchema = z.object({
	email: z.string().min(1, "Email is required").email({ message: "Email is not valid" }),
	password: z.string().min(1, "Password is required"),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
export type LogInSchema = z.infer<typeof logInSchema>
