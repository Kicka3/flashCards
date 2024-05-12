import { z } from 'zod'

export const updateUserNameSchema = z.object({
  name: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must contain only letters, numbers, and underscores'),
})
export type UpdateUserFormValues = z.infer<typeof updateUserNameSchema>
