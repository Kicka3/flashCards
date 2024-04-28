import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { useSignUpMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUp.module.scss'

type Props = {}

const signUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email(),
    password: z.string().min(4),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'The passwords must match.',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signUpSchema>

export const SignUp = ({}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const [signUp] = useSignUpMutation()
  const onSubmit = (data: FormValues) => {
    const { email, password } = data

    signUp({ email, password }).unwrap()
  }

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFieldContainer}>
          <ControlledTextField
            control={control}
            {...register('email')}
            errorMessage={errors.email?.message}
            label={'Email'}
            placeholder={'j&johnson@gmail.com'}
          />
          <ControlledTextField
            control={control}
            {...register('password')}
            errorMessage={errors.email?.message}
            label={'Email'}
            placeholder={'example123'}
          />
          <ControlledTextField
            control={control}
            {...register('confirmPassword')}
            errorMessage={errors.email?.message}
            label={'Email'}
            placeholder={'example123'}
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
