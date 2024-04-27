import z from 'zod'
export const emailSchema = z.string().email()

export const signUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: emailSchema,
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  })

export type FormValues = z.infer<typeof signUpSchema>
