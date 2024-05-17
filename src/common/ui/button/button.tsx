import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  variant?: 'icon' | 'link' | 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth = false,
    icon,
    variant = 'primary',
    ...rest
  } = props

  const classNames = {
    buttonStyles: clsx(
      s.button,
      s[variant],
      fullWidth && s.fullWidth,
      icon && s.withIcon,
      className
    ),
    forLink: clsx(variant === 'link' ? 'btnForLink' : 'primary'),
    fullWidthIcon: clsx(fullWidth ? s.fullWidthIconWrapper : s.iconWrapper),
  }

  return (
    <Component className={classNames.buttonStyles} {...rest}>
      {icon && <div className={classNames.fullWidthIcon}>{icon}</div>}
      {children}
    </Component>
  )
}
