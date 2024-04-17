import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './header.module.scss'

type Props = { isAuth: boolean } & ComponentPropsWithoutRef<'header'>

const Header = ({ children, className, isAuth, ...rest }: Props) => {
  return (
    <header className={s.headerWrapper}>
      <div className={clsx(s.header, className)} {...rest}>
        <div>HEADERicon</div>

        {isAuth ? <div>login</div> : <div>logout</div>}
      </div>
    </header>
  )
}

export default Header
