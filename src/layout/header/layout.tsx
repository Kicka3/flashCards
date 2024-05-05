import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@/layout/header/ui/header'

import s from './layout.module.scss'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header isAuth />

      <main className={s.wrapper}>
        <Outlet />
        {children}
      </main>
    </>
  )
}

export default Layout
