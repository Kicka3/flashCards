import { Outlet } from 'react-router-dom'

import { Loader } from '@/common/ui/loader'
import { Header } from '@/layout/header/ui'
import { useMeQuery } from '@/services/auth'

import s from './layout.module.scss'

export const Layout = () => {
  const { data, isError, isLoading } = useMeQuery()
  const isAuth = !isError

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Header isAuth={isAuth} isLoading={isLoading} profile={data} />
      <main className={s.wrapper}>
        <Outlet context={{ isAuth }} />
      </main>
    </>
  )
}
