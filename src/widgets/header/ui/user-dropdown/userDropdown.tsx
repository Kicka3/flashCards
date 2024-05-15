import { useNavigate } from 'react-router-dom'

import LogOutOutline from '@/assets/icons/components/LogOutOutline'
import PersonOutline from '@/assets/icons/components/PersonOutline'
import { ROUTES } from '@/common/enums/enums'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
import { Typography } from '@/common/ui/typography'
import { useLogoutMutation } from '@/services/auth'

import s from './userDropdown.module.scss'

type Props = {
  description?: string
  email?: string
  img?: string
  name?: string
}

export const UserDropDown = ({ description, email, img, name }: Props) => {
  const navigate = useNavigate()
  const [logout] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      navigate('/signIn')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

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
        <DropdownItem className={s.item} onClick={() => navigate(ROUTES.PROFILE)}>
          <PersonOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>My Profile</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item} onClick={handleLogout}>
          <LogOutOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Sign Out</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
