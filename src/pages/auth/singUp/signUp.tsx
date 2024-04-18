import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {}

const loginSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof loginSchema>

export const SignUp = ({}: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField {...register('email')} error={errors.email?.message} label={'email'} />
          <TextField
            {...register('password')}
            error={errors.password?.message}
            label={'password'}
            variant={'password'}
          />
          <TextField
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            label={'password'}
            variant={'password'}
          />
          <Button type={'submit'}>Sign Up</Button>
          <Typography variant={'body2'}>Already have an account?</Typography>
          <Typography as={'a'} variant={'link1'}>
            Sign In
          </Typography>
        </form>
      </Card>
    </>
  )
}
