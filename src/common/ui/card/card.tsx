import { ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

export type Props<T extends ElementType = 'div'> = {
  as?: T
  children?: ReactNode
  className?: string
  classNameWrapper?: string
}

export const Card = (props: Props) => {
  const { as: Component = 'div', children, className, classNameWrapper, ...rest } = props
  const classNames = {
    cardChildren: clsx(s.cardChildren, className),
    cardWrapper: clsx(s.card, classNameWrapper),
  }

  return (
    <div className={classNames.cardWrapper}>
      <div className={classNames.cardChildren} {...rest}>
        {children}
      </div>
    </div>
  )
}
