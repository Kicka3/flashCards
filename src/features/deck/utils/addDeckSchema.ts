import z from 'zod'

export const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(4).max(21),
})
export type AddDeckFormValues = z.infer<typeof addDeckSchema>
