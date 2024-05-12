import z from 'zod'

export const addDeckSchema = z.object({
  isPrivate: z.boolean().default(false),
  name: z.string().min(4, { message: 'Имя колоды обязательно (минимум 4 символа)' }).max(30),
})
export type AddDeckFormValues = z.infer<typeof addDeckSchema>
