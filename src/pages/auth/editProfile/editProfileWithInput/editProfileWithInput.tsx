import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import {
  UpdateUserFormValues,
  updateUserNameSchema,
} from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './editProfileWithInput.module.scss'

type Props = {
  avatar: string
  updateNickname: (data: UpdateUserFormValues) => void
}
export const EditProfileWithInput = ({ avatar, updateNickname }: Props) => {
  const {
    control,
    // formState: { errors }, включить когда нужно будет обрабатывать ошибки
    handleSubmit,
  } = useForm<UpdateUserFormValues>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(updateUserNameSchema),
  })

  const onSubmit = (data: UpdateUserFormValues) => {
    updateNickname(data)
  }

  return (
    <Card>
      <div className={s.headerContainer}>
        <Typography color={'textSecondary'} variant={'h1'}>
          Personal Information
        </Typography>
        <img alt={'avatar'} className={s.avatar} src={avatar} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.footerContainer}>
          <ControlledTextField control={control} label={'Nickname'} name={'name'} />
          <Button fullWidth>
            <Typography variant={'sub2'}>Save Changes</Typography>
          </Button>
        </div>
      </form>
    </Card>
  )
}
