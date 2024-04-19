import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'
import { Checkbox } from '@/common/ui/сheckbox'

import s from './signIn.module.scss'

type Props = {}
type FormValues = {
  login: string
  password: string
}

export const SignIn = ({}: Props) => {
  const { handleSubmit, register } = useForm<FormValues>()
  const onSubmit = () => {
    console.log('OnSubmit')
  }

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
            <TextField
              className={s.loginField}
              label={'Email'}
              placeholder={'j&johnson@gmail.com'}
            />
            <TextField
              className={s.passwordField}
              label={'Password'}
              placeholder={'Your password'}
              variant={'password'}
            />
          </div>
          <Checkbox className={s.rememberMe} text={'Remember me'} />
        </div>
        {/* ‼ Прикрутить после того как обернём роутером ‼ */}
        {/*<NavLink to={'#'}>Forgot Password ?</NavLink>*/}
        <a className={s.forgotPasswordField}>Forgot Password ?</a>
        <Button fullWidth>Sign In</Button>
      </form>
      <div className={s.footerForm}>
        <Typography className={s.dontHaveAcc} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Button className={s.signUpBtn} variant={'link'}>
          Sign Up
        </Button>
      </div>
    </Card>
  )
}
