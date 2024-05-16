import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import { FormValues, signUpSchema } from '@/pages/auth/singUp/utils'
import { useSignUpMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signUp.module.scss'

type Props = {}

export const SignUp = ({}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
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
            className={s.textField}
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'example123'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            variant={'password'}
          />
          <ControlledTextField
            control={control}
            errorMessage={errors.confirmPassword?.message}
            label={'Confirm Password'}
            name={'confirmPassword'}
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
          <Typography as={Link} className={s.signLink} to={'/signIn'} variant={'link1'}>
            Sign In
          </Typography>
        </div>
      </form>
    </Card>
  )
}
