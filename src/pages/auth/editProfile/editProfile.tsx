import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'

import s from './editProfile.module.scss'

// fake user data
const user = {
  avatar: 'https://cdn-icons-png.flaticon.com/512/18/18601.png',
  email: 'example123@gmail.com',
  name: 'Nick',
}

export const EditProfile = () => {
  return (
    <Card className={s.container}>
      <Typography color={'textSecondary'} variant={'h1'}>
        Personal Info
      </Typography>
      <img alt={'avatar'} className={s.avatar} src={user.avatar} />
      <Typography variant={'h2'}>{user.name}</Typography>
      <Typography className={s.email} variant={'body2'}>
        {user.email}
      </Typography>
      <Button>
        <LogOutOutline />
        Logout
      </Button>
    </Card>
  )
}
