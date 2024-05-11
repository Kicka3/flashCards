import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { UserData } from '@/services/auth'
import clsx from 'clsx'

import s from './header.module.scss'

import Profile from './profile/profile'

type Props = { isAuth: boolean; profile: UserData | undefined } & ComponentPropsWithoutRef<'header'>

export const Header = ({ children, className, isAuth, profile, ...rest }: Props) => {
  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <Link to={'/'}>HEADERlogo</Link>

        {isAuth ? <Profile profile={profile} /> : <div>login</div>}
      </div>
    </header>
  )
}
