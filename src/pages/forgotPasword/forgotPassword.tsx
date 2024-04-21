import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

type Props = {}

const loginSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof loginSchema>

export const ForgotPassword = ({}: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()

  const onSubmit = (data: FormValues) => {
    /* запрос на сервер */
    console.log(data)

    navigate('/checkEmail')
  }

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Forgot your password?
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.textFieldContainer}>
          <TextField
            {...register('email')}
            className={s.textField}
            errorMessage={errors.email?.message}
            label={'Email'}
            placeholder={'Email'}
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
