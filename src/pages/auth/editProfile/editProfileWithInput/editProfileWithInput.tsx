import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { TextField } from '@/common/ui/textField'

import s from './editProfileWithInput.module.scss'

type Props = {
  avatar: string
}

export const EditProfileWithInput = ({ avatar }: Props) => {
  return (
    <Card>
      <div className={s.headerContainer}>
        <Typography color={'textSecondary'} variant={'h1'}>
          Personal Information
        </Typography>
        <img alt={'avatar'} className={s.avatar} src={avatar} />
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
