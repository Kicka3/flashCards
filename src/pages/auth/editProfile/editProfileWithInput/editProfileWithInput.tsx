import { useForm } from 'react-hook-form'

import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import {
  UpdateUserFormValues,
  updateUserNameSchema,
} from '@/pages/auth/editProfile/editProfileWithInput/utils/editWithInputSchema'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './editProfileWithInput.module.scss'

type Props = {
  setEditMode: (editMode: boolean) => void
  updateNickname: (data: UpdateUserFormValues) => void
}
export const EditProfileWithInput = ({ setEditMode, updateNickname }: Props) => {
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

  const onSaveHandler = () => {
    setEditMode(false)
    handleSubmit(onSubmit)()
  }

  return (
    <>
      <form>
        <div className={s.footerContainer}>
          <ControlledTextField control={control} label={'Nickname'} name={'name'} />
          <Button fullWidth onClick={onSaveHandler} type={'submit'}>
            <Typography variant={'sub2'}>Save Changes</Typography>
          </Button>
        </div>
      </form>
    </>
  )
}
