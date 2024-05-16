import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums/enums'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import { FormValues, forgotPasswordSchema } from '@/pages/auth/forgotPasword/utils'
import { RecoverPassword, useRecoverPasswordMutation } from '@/services/auth'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './forgotPassword.module.scss'

type Props = {}

export const ForgotPassword = ({}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const navigate = useNavigate()
  const [forgotPassword] = useRecoverPasswordMutation()

  const onSubmit = async ({ email }: FormValues) => {
    const recoverPassword: RecoverPassword = {
      email,
      html: '',
      subject: '',
    }

    try {
      const result = await forgotPassword(recoverPassword).unwrap()

      const promiseResult = Promise.resolve(result)

      await toast.promise(promiseResult, {
        pending: 'Sending email...',
        success: 'Email sent successfully!',
      })

      navigate(ROUTES.CHECK_EMAIL)
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'An error occurred while resetting the password:')
    }
  }

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Forgot your password?
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFieldContainer}>
          <ControlledTextField
            className={s.textField}
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Qwerty123'}
          />
          <Typography className={s.description} variant={'body2'}>
            Enter your address and we will send you further instructions
          </Typography>
        </div>
        <Button className={s.button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>

      <div className={s.footerContainer}>
        <Typography className={s.questionMark} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography as={Link} className={s.loginLink} to={ROUTES.SIGN_IN} variant={'link1'}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}
