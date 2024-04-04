import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './checkbox.module.scss'

type ChckboxProps = {}

export const Checkbox = (props: ChckboxProps) => {
  const {} = props

  const classNames = {
    chkboxStyles: clsx(),
  }

  return <div className={s.chckboxWrapper}></div>
}
