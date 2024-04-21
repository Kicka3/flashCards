import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createNewPassword.module.scss'

type Props = {}

const loginSchema = z.object({
  password: z.string().min(3),
})

type FormValues = z.infer<typeof loginSchema>

export const CreateNewPassword = ({}: Props) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Create new password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('password')}
          errorMessage={errors.password?.message}
          label={'Password'}
          placeholder={'Password'}
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
