import { z } from 'zod'

export const updateUserNameSchema = z.object({
  name: z.string().min(3),
})
export type UpdateUserFormValues = z.infer<typeof updateUserNameSchema>
