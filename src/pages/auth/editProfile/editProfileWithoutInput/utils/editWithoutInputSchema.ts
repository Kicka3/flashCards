import { z } from 'zod'

export const updateAvatarSchema = z.object({
  avatar: z.string(),
})

export type UpdateAvatarFormValues = z.infer<typeof updateAvatarSchema>
