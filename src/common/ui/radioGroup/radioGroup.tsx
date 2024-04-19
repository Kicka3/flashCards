import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupRadix.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>
>(({ children, className, ...rest }, ref) => {
  const classNames = clsx(s.radio, className)

  return (
    <RadioGroupRadix.Root className={classNames} ref={ref} {...rest}>
      {children}
    </RadioGroupRadix.Root>
  )
})
