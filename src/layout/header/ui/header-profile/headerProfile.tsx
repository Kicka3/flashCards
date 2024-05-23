import { ComponentPropsWithoutRef, KeyboardEvent, useState } from 'react'

import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { getAvatarUrl } from '@/common/utils/getAvatarUrl'
import { UserData } from '@/services/auth'
import { UserDropDown } from '@/widgets/user-dropdown'
import clsx from 'clsx'

import s from './headerProfile.module.scss'

type Props = { profile: UserData | undefined } & ComponentPropsWithoutRef<'header'>

export const Profile = ({ className, profile, ...rest }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = (open: boolean) => {
    setIsDropdownOpen(open)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleDropdown(!isDropdownOpen)
    }
  }

  const avatar = getAvatarUrl({ avatar: profile?.avatar, name: profile?.name })

  return (
    <div className={clsx(s.profile, className)} {...rest}>
      <Typography variant={'sub1'}>{profile?.name}</Typography>
      <Button
        aria-expanded={isDropdownOpen}
        aria-haspopup={'true'}
        className={s.btnDropDown}
        onClick={() => toggleDropdown(!isDropdownOpen)}
        onKeyDown={handleKeyDown}
      >
        <div className={s.avatar}>
          <UserDropDown
            description={'avatar'}
            email={profile?.email}
            img={avatar}
            isOpen={isDropdownOpen}
            name={profile?.name}
            toggleDropdown={toggleDropdown}
          />
        </div>
      </Button>
    </div>
  )
}
