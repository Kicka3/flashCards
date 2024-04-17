import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './layout.module.scss'

type Props = {} & ComponentPropsWithoutRef<'div'>

const Layout = ({ children, className, ...rest }: Props) => {
  return (
    <div className={clsx(s.layout, className)} {...rest}>
      {children}
    </div>
  )
}

export default Layout
