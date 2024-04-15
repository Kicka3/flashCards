import React from 'react'

import s from 'layout.module.scss'

const Layout = () => {
  return (
    <div className={s.layout}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
