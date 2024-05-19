import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Typography } from '@/common/ui/typography'
import {
  NewPasswordFormValues,
  createNewPasswordSchema,
} from '@/pages/auth/createNewPassword/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

type Props = {
  onSubmit: ({ password }: NewPasswordFormValues) => void
}

export const CreateNewPassword = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewPasswordFormValues>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(createNewPasswordSchema),
  })

  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Create new password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          placeholder={'Qwerty123'}
          variant={'password'}
        />

        <Typography className={s.description} variant={'body2'}>
          Create a new password, and we will send you further instructions via email.
        </Typography>

        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
