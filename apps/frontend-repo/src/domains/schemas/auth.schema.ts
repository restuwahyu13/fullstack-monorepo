import { z } from 'zod'

export const LoginSchema: z.ZodTypeAny = z.object({
	email: z.string().nonempty('Email is not empty').email('Email must be a valid'),
	password: z
		.string()
		.nonempty('Password is not empty')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]).{8,}$/,
			'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		)
})

export type LoginFormSchema = z.infer<typeof LoginSchema>
