import { z } from 'zod'

export const UpdateSchema: z.ZodTypeAny = z.object({
	id: z.string(),
	totalAverageWeightRatings: z.string(),
	numberOfRents: z.string()
})

export type UpdateFormSchema = z.infer<typeof UpdateSchema>
