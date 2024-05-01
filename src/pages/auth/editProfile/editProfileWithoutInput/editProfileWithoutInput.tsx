import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'

import s from './editProfileWithoutInput.module.scss'

/** fake user data */
const user = {
  avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
  email: 'example123@gmail.com',
  name: 'Nick',
}

export const EditProfileWithoutInput = () => {
  return (
    <Card className={s.container}>
      <Typography color={'textSecondary'} variant={'h1'}>
        Personal Info
      </Typography>
      <form>
        <div className={s.avatarContainer}>
          <img alt={'avatar'} className={s.avatar} src={user.avatar} />
          <Button className={s.avatarButtonIcon} variant={'secondary'}>
            <Edit2Outline height={16} width={16} />
          </Button>
        </div>
      </form>
      <div className={s.nameContainer}>
        <Typography variant={'h2'}>{user.name}</Typography>
        <Button className={s.nameButtonIcon}>
          <Edit2Outline height={16} width={16} />
        </Button>
      </div>
      <Typography className={s.email} variant={'body2'}>
        {user.email}
      </Typography>
      <Button variant={'secondary'}>
        <div className={s.btnContainer}>
          <LogOutOutline height={16} width={16} />
          Logout
        </div>
      </Button>
    </Card>
  )
}
