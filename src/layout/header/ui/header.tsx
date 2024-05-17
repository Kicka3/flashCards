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
  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <Link to={'/'}>HEADERlogo</Link>
        <HeaderContent isAuth={isAuth} isLoading={isLoading} profile={profile} />
      </div>
    </header>
  )
}

function HeaderContent({
  isAuth,
  isLoading,
  profile,
}: Pick<Props, 'isAuth' | 'isLoading' | 'profile'>) {
  if (isLoading) {
    return null
  }

  if (isAuth) {
    return <HeaderProfile profile={profile} />
  }

  return (
    <Button as={Link} to={'/signIn'} variant={'secondary'}>
      Sign In
    </Button>
  )
}
