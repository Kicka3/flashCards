import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/enums/enums'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox/controlledCheckbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import { FormValues, loginSchema } from '@/pages/auth/signIn/utils/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

type Props = {
  onSubmit: (data: FormValues) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: undefined,
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.signInContainer}>
          <div className={s.headerForm}>
            <Typography className={s.signInTitle} variant={'h1'}>
              Sign In
            </Typography>
          </div>
          <div className={s.fieldsWrapper}>
            <ControlledTextField
              control={control}
              errorMessage={errors.email?.message}
              label={'Email'}
              name={'email'}
              placeholder={'j&johnson@gmail.com'}
            />
            <ControlledTextField
              control={control}
              errorMessage={errors.password?.message}
              label={'Password'}
              name={'password'}
              placeholder={'Qwerty123'}
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
        <div className={s.forgotPasswordField}>
          <Link className={s.forgotPasswordText} to={ROUTES.FORGOT_PASSWORD}>
            Forgot Password ?
          </Link>
        </div>
        <Button fullWidth>Sign In</Button>
      </form>
      <div className={s.footerForm}>
        <Typography className={s.dontHaveAcc} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Typography as={Link} className={s.signLink} to={ROUTES.SIGN_UP} variant={'link1'}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
