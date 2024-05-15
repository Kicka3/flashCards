import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

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

  const onSubmit = ({ email }: FormValues) => {
    const recoverPassword: RecoverPassword = {
      email,
      html: '', // Provide a default value or actual value if required
      subject: '', // Provide a default value or actual value if required
    }

    forgotPassword(recoverPassword).unwrap()
    console.log(email)

    navigate('/checkEmail')
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
        <Typography as={Link} className={s.loginLink} to={'/signIn'} variant={'link1'}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}
