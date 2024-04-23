import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import PersonOutline from '@/assets/icons/components/PersonOutline'
import { Typography } from '@/common/ui'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'

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
      <DropDownMenu trigger={<img alt={description} src={img} width={36} />}>
        <DropdownItem className={s.userItem}>
          <img alt={''} className={s.avatar} src={img} />
          <div className={s.userInfo}>
            <Typography variant={'sub2'}>{name}</Typography>
            <Typography variant={'caption'}>{email}</Typography>
          </div>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <PersonOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>My Profile</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <LogOutOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Sign Out</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}