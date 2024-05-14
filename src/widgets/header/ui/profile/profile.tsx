import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/common/ui'
import { getAvatarUrl } from '@/common/utils/getAvatarUrl'
import { UserData } from '@/services/auth'
import clsx from 'clsx'

import s from './profile.module.scss'

import { UserDropDown } from '../user-dropdown/userDropdown'

type Props = { profile: UserData | undefined } & ComponentPropsWithoutRef<'header'>

const Profile = ({ className, profile, ...rest }: Props) => {
  const onOpenProfile = () => {
    /** логика открытия профиля модалка или другая страница отрисовываться будет с editProfileWithoutInput*/
  }
  const avatar = getAvatarUrl({ avatar: profile?.avatar, name: profile?.name })

  return (
    <div className={clsx(s.profile, className)} {...rest}>
      <button className={s.userName} onClick={onOpenProfile}>
        <Typography variant={'sub1'}>{profile?.name}</Typography>
      </button>

      <div className={s.avatar}>
        <UserDropDown email={profile?.email} img={avatar} name={profile?.name} />
      </div>
    </div>
  )
}

export default Profile

/** временные файлы пока не будет подключена авторизация */
// const tempUser = {
//   description: 'userAvatar',
//   email: 'email@gmail.com',
//   img: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
//   name: 'Unknown',
// }
