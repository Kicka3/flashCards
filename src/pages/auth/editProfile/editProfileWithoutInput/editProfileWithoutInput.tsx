import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'

import s from './editProfileWithoutInput.module.scss'

export type DataProps = {
  avatar: string
  email: string
  name: string
}

type Props = {
  avatar?: string
  email: string
  logout: () => void
  name: string
  setEditMode: (editMode: boolean) => void
}

export const EditProfileWithoutInput = ({ email, logout, name, setEditMode }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.nameContainer}>
        <Typography variant={'h2'}>{name}</Typography>
        <Button className={s.nameButtonIcon} onClick={() => setEditMode(true)} variant={'icon'}>
          <Edit2Outline height={16} width={16} />
        </Button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <Button onClick={logout} variant={'secondary'}>
        <div className={s.btnContainer}>
          <LogOutOutline height={16} width={16} />
          Logout
        </div>
      </Button>
    </div>
  )
}
