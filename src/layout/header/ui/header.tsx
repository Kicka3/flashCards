import { ComponentPropsWithoutRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
  const { pathname } = useLocation()

  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <Link to={'/'}>HEADERlogo</Link>
        <HeaderContent isAuth={isAuth} isLoading={isLoading} path={pathname} profile={profile} />
      </div>
    </header>
  )
}

function HeaderContent({
  isAuth,
  isLoading,
  path,
  profile,
}: Pick<Props, 'isAuth' | 'isLoading' | 'profile'> & { path: string }) {
  if (isLoading) {
    return null
  }

  if (isAuth) {
    return <HeaderProfile profile={profile} />
  }

  const isSignIn = path === '/signIn'

  return (
    <Button as={Link} to={isSignIn ? '/signUp' : '/signIn'} variant={'secondary'}>
      {isSignIn ? 'Sign Up' : 'Sign In'}
    </Button>
  )
}
