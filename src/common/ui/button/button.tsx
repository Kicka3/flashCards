import React, { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type ButtonOwnProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  icon?: ReactNode
  variant?: 'icon' | 'link' | 'primary' | 'secondary'
}

type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      children,
      className,
      fullWidth = false,
      icon,
      variant = 'primary',
      ...rest
    }: ButtonProps<T>,
    ref: React.ComponentPropsWithRef<T>['ref']
  ) => {
    const Component = as || 'button'

    const classNames = clsx(
      s.button,
      s[variant],
      fullWidth && s.fullWidth,
      icon && s.withIcon,
      className
    )

    return (
      <Component className={classNames} ref={ref} {...rest}>
        {icon && <div className={s.iconWrapper}>{icon}</div>}
        {children}
      </Component>
    )
  }
)
