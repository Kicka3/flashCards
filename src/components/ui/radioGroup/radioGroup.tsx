import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

export type Props = {} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  ({ children, className, id, ...rest }, ref) => {
    const classNames = clsx(s.radio, className)
    const generatedId = useId()
    const domainId = id ?? generatedId

    return (
      <RadioGroupRadix.Root className={classNames} ref={ref}>
        <RadioGroupRadix.Item id={domainId}>
          <RadioGroupRadix.Indicator />
        </RadioGroupRadix.Item>
        <label htmlFor={'r1'}>{children}</label>
      </RadioGroupRadix.Root>
    )
  }
)
