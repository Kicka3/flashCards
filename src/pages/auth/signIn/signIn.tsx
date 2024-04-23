import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox/controlledCheckbox'
import { TextField } from '@/common/ui/textField'
import { FormValues, loginSchema } from '@/pages/auth/signIn/utils/loginSchema'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

type Props = {}

export const SignIn = ({}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <div className={s.signInContainer}>
          <div className={s.headerForm}>
            <Typography className={s.signInTitle} variant={'h1'}>
              Sign In
            </Typography>
          </div>
          <div className={s.fieldsWrapper}>
            <TextField
              {...register('email')}
              errorMessage={errors.email?.message}
              label={'Email'}
              placeholder={'j&johnson@gmail.com'}
            />
            <TextField
              {...register('password')}
              errorMessage={errors.password?.message}
              label={'Password'}
              placeholder={'Your password'}
              variant={'password'}
            />
          </div>
          <ControlledCheckbox
            className={s.rememberMe}
            control={control}
            name={'rememberMe'}
            text={'Remember me'}
          />
        </div>
        <Link className={s.forgotPasswordField} to={'/forgotPassword'}>
          Forgot Password ?
        </Link>
        <Button fullWidth>Sign In</Button>
      </form>
      <div className={s.footerForm}>
        <Typography className={s.dontHaveAcc} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button as={Link} to={'/signUp'} variant={'link'}>
          Sign Up
        </Button>
      </div>
    </Card>
  )
}