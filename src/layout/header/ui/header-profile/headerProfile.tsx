import { ComponentPropsWithoutRef } from 'react'

import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { getAvatarUrl } from '@/common/utils/getAvatarUrl'
import { UserData } from '@/services/auth'
import { UserDropDown } from '@/widgets/user-dropdown/userDropdown'
import clsx from 'clsx'

import s from './headerProfile.module.scss'

type Props = { profile: UserData | undefined } & ComponentPropsWithoutRef<'header'>

export const HeaderProfile = ({ className, profile, ...rest }: Props) => {
  const onOpenProfile = () => {
    /** логика открытия профиля модалка или другая страница отрисовываться будет с editProfileWithoutInput*/
  }
  const avatar = getAvatarUrl({ avatar: profile?.avatar, name: profile?.name })

  return (
    <div className={clsx(s.profile, className)} {...rest}>
      <Button className={s.userName} onClick={onOpenProfile} variant={'link'}>
        <Typography variant={'sub1'}>{profile?.name}</Typography>
      </Button>
      <div className={s.avatar}>
        <UserDropDown email={profile?.email} img={avatar} name={profile?.name} />
      </div>
    </div>
  )
}
