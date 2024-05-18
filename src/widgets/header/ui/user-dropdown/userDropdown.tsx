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
  isOpen: boolean
  name?: string
  toggleDropdown: (open: boolean) => void
}

export const UserDropDown = ({ description, email, img, isOpen, name, toggleDropdown }: Props) => {
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

  const onNavigateProfile = () => {
    navigate(ROUTES.PROFILE)
  }

  return (
    <DropDownMenu
      isOpen={isOpen}
      onToggle={toggleDropdown}
      trigger={<img alt={description} src={img} width={36} />}
    >
      <DropdownItem className={s.userItem}>
        <img alt={'avatar'} className={s.avatar} src={img} />
        <div className={s.userInfo}>
          <Typography variant={'sub2'}>{name}</Typography>
          <Typography variant={'caption'}>{email}</Typography>
        </div>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item} onClick={onNavigateProfile}>
        <PersonOutline height={'16px'} width={'16px'} />
        <Typography as={'a'} variant={'caption'}>
          My Profile
        </Typography>
      </DropdownItem>
      <DropdownSeparator />
      <DropdownItem className={s.item} onClick={handleLogout}>
        <LogOutOutline height={'16px'} width={'16px'} />
        <Typography variant={'caption'}>Sign Out</Typography>
      </DropdownItem>
    </DropDownMenu>
  )
}
