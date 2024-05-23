import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/enums/enums'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import { FormValues, forgotPasswordSchema } from '@/pages/auth/forgotPasword/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './forgotPassword.module.scss'

type Props = { onSubmit: ({ email }: FormValues) => void }

export const ForgotPassword = ({ onSubmit }: Props) => {
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
