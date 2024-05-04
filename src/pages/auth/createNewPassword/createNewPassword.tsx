import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import {
  NewPasswordFormValues,
  createNewPasswordSchema,
} from '@/pages/auth/createNewPassword/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

export const CreateNewPassword = () => {
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

  const onSubmit = (data: NewPasswordFormValues) => {
    // Handle form submission (e.g., send data to the server)
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
