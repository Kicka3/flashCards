import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import PersonOutline from '@/assets/icons/components/PersonOutline'
import { Typography } from '@/components/ui'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown/dropdownSeparator'

import s from './userDropdown.module.scss'

type Props = {
  description: string
  email: string
  img: string
  name: string
}

export const UserDropDown = ({ description, email, img, name }: Props) => {
  return (
    <>
      <DropdownMenu trigger={<img alt={description} src={img} />}>
        <DropdownItem className={s.userItem}>
          <img alt={''} className={s.avatar} src={img} />
          <div className={s.userInfo}>
            <Typography variant={'sub2'}>{name}</Typography>
            <Typography variant={'caption'}>{email}</Typography>
          </div>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <PersonOutline />
          <Typography variant={'caption'}>My Profile</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <LogOutOutline />
          <Typography variant={'caption'}>Sign Out</Typography>
        </DropdownItem>
      </DropdownMenu>
    </>
  )
}
