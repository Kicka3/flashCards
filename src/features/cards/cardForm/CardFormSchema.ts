import z from 'zod'

export const addCardSchema = z.object({
  answer: z.string().min(4).max(21),
  question: z.string().min(4).max(21),
})

export type AddCardFormValues = z.infer<typeof addCardSchema>
