import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

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
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFieldContainer}>
          <TextField
            {...register('email')}
            className={s.textField}
            errorMessage={errors.email?.message}
            label={'Email'}
          />
          <TextField
            {...register('password')}
            errorMessage={errors.password?.message}
            label={'Password'}
            variant={'password'}
          />
          <TextField
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
            label={'Confirm Password'}
            variant={'password'}
          />
        </div>
        <Button className={s.button} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <div className={s.footerContainer}>
          <Typography className={s.questionMark} variant={'body2'}>
            Already have an account?
          </Typography>
          <Typography as={'a'} className={s.signLink} variant={'link1'}>
            Sign In
          </Typography>
        </div>
      </form>
    </Card>
  )
}
