import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

type Props = {}

const resetPasswordSchema = z.object({
  password: z.string().min(4),
})

type FormValues = z.infer<typeof resetPasswordSchema>

export const CreateNewPassword = ({}: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  // const [password] = useResetPasswordMutation()

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Create new password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          {...register('password')}
          errorMessage={errors.password?.message}
          label={'Password'}
          placeholder={'example123'}
          variant={'password'}
        />
        <Typography className={s.description} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button as={Link} fullWidth to={'/signIn'} type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
