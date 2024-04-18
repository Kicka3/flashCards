import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import clsx from 'clsx'

import s from './header.module.scss'

import Profile from './profile/profile'

type Props = { isAuth: boolean } & ComponentPropsWithoutRef<'header'>

const Header = ({ children, className, isAuth, ...rest }: Props) => {
  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <Link to={'/'}>HEADERlogo</Link>

        {isAuth ? <Profile /> : <div>login</div>}
      </div>
    </header>
  )
}

export default Header
