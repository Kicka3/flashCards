import { Outlet } from 'react-router-dom'

import { Header } from '@/layout/header/ui'
import { useMeQuery } from '@/services/auth'

import s from './layout.module.scss'

const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError

  return (
    <>
      <Header isAuth={isAuth} isLoading={isLoading} profile={data} />
      <main className={s.wrapper}>
        <Outlet context={{ data, isAuth, isLoading }} />
      </main>
    </>
  )
}

export default Layout
