import z from 'zod'

export const CardSchema = z.object({
  answer: z.string().min(4).max(21),
  question: z.string().min(4).max(21),
})

export type CardFormValues = z.infer<typeof CardSchema>
