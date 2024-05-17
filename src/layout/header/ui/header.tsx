import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { HeaderProfile } from '@/layout/header/ui/header-profile'
import { UserData } from '@/services/auth'
import clsx from 'clsx'

import s from './header.module.scss'

type Props = {
  isAuth: boolean
  isLoading: boolean
  profile: UserData | undefined
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ children, className, isAuth, isLoading, profile, ...rest }: Props) => {
  let content = null

  if (isAuth && !isLoading) {
    content = <HeaderProfile profile={profile} />
  } else if (!isLoading) {
    content = (
      <Button as={Link} to={'/signIn'} variant={'secondary'}>
        Sign In
      </Button>
    )
  }

  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <Link to={'/'}>HEADERlogo</Link>
        {content}
      </div>
    </header>
  )
}
