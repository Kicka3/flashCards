import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'

import s from './editProfileWithInput.module.scss'

// fake user data
const user = {
  avatar: 'https://dz2cdn1.dzone.com/storage/user-avatar/534373-thumb.jpg',
  name: 'Nick',
}

export const EditProfileWithInput = () => {
  return (
    <Card>
      <div className={s.headerContainer}>
        <Typography color={'textSecondary'} variant={'h1'}>
          Personal Information
        </Typography>
        <img alt={'avatar'} className={s.avatar} src={user.avatar} />
      </div>
      <div className={s.footerContainer}>
        <TextField label={'Nickname'} />
        <Button fullWidth>
          <Typography variant={'sub2'}>Save Changes</Typography>
        </Button>
      </div>
    </Card>
  )
}
