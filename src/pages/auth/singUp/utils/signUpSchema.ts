import z from 'zod'

export const signUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>
