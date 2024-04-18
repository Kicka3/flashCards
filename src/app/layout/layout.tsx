import { ComponentPropsWithoutRef } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/layout/header/ui/header'
import clsx from 'clsx'

import s from './layout.module.scss'

type Props = {} & ComponentPropsWithoutRef<'div'>

const Layout = ({ children, className, ...rest }: Props) => {
  return (
    <div className={clsx(s.layout, className)} {...rest}>
      <Header isAuth />

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
