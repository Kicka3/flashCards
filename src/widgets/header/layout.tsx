import { Outlet } from 'react-router-dom'

import { useMeQuery } from '@/services/auth'

import s from './layout.module.scss'

import { Header } from './ui'

const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError

  return (
    <>
      <Header isAuth={isAuth} profile={data} />
      <main className={s.wrapper}>
        <Outlet context={{ data, isAuth, isLoading }} />
      </main>
    </>
  )
}

export default Layout
