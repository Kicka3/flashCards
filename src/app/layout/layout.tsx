import { Outlet } from 'react-router-dom'

import { useMeQuery } from '@/services/auth'
import { Header } from '@/widgets/header/ui'

import s from './layout.module.scss'

const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError

  return (
    <>
      <Header isAuth={isAuth} profile={data} />

      <main className={s.wrapper}>
        <Outlet context={{ isAuth, isLoading }} />
      </main>
    </>
  )
}

export default Layout
