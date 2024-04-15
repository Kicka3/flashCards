import { CSSProperties, ComponentPropsWithoutRef } from 'react'

export type PropsIcon = {
  color?: string
  size?: string
} & ComponentPropsWithoutRef<'span'>

export const IconWrapper = (props: PropsIcon) => {
  const { children, color = 'white', size = '24px', ...rest } = props

  return (
    <span
      aria-hidden={'true'}
      role={'img'}
      style={
        {
          color: color,
          display: 'inline-flex',
          fontSize: 'inherit',
          height: size,
          width: size,
        } as CSSProperties
      }
      {...rest}
    >
      {children}
    </span>
  )
}
