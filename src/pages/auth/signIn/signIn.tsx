import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox/controlledCheckbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import { FormValues, loginSchema } from '@/pages/auth/signIn/utils/loginSchema'
import { useLoginMutation } from '@/services/auth'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

export const SignIn = () => {
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

  const [login] = useLoginMutation()

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Some errors occurred while sign in')
    }
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
        <div className={s.forgotPasswordField}>
          <Link className={s.forgotPasswordText} to={'/forgotPassword'}>
            Forgot Password ?
          </Link>
        </div>
        <Button fullWidth>Sign In</Button>
      </form>
      <div className={s.footerForm}>
        <Typography className={s.dontHaveAcc} variant={'body2'}>
          Don&apos;t have an account?
        </Typography>
        <Typography as={Link} className={s.signLink} to={'/signUp'} variant={'link1'}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
