import { z } from 'zod'

export const createNewPasswordSchema = z.object({
  password: z.string().min(3),
})

export type NewPasswordFormValues = z.infer<typeof createNewPasswordSchema>
