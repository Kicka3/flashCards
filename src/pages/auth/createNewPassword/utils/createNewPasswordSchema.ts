import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters long')
    .max(100, 'Password must be less than 100 characters'),
})

export type NewPasswordFormValues = z.infer<typeof createNewPasswordSchema>
