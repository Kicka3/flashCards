import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/common/ui'
import clsx from 'clsx'

import s from './profile.module.scss'

import { UserDropDown } from '../user-dropdown/userDropdown'

type Props = {} & ComponentPropsWithoutRef<'header'>

const Profile = ({ className, ...rest }: Props) => {
  const onOpenProfile = () => {
    /** логика открытия профиля модалка или другая страница отрисовываться будет с editProfile*/
  }

  return (
    <div className={clsx(s.profile, className)} {...rest}>
      <button className={s.userName} onClick={onOpenProfile}>
        <Typography variant={'sub1'}>{tempUser.name}</Typography>
      </button>

      <div className={s.avatar}>
        <UserDropDown {...tempUser} />
      </div>
    </div>
  )
}

export default Profile

/** временные файлы пока не будет подключена авторизация */
const tempUser = {
  description: 'userAvatar',
  email: 'email@gmail.com',
  img: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
  name: 'Unknown',
}
