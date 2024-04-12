import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'
// import { v1 as uuid } from 'uuid'

import s from './radioGroup.module.scss'

import { Typography } from '..'

export type Props = {
  options: string[]
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  ({ children, className, id, options, ...rest }, ref) => {
    const classNames = clsx(s.radio, className)

    return (
      <RadioGroupRadix.Root className={classNames} ref={ref} {...rest}>
        {options.map(item => {
          // const generatedId = uuid()
          const generatedId = crypto.randomUUID()

          return (
            <div className={s.container} key={generatedId}>
              <RadioGroupRadix.Item className={s.item} id={generatedId} value={item}>
                <RadioGroupRadix.Indicator className={s.indicator} />
              </RadioGroupRadix.Item>
              <Typography as={'label'} className={s.label} htmlFor={generatedId} variant={'body2'}>
                {item}
              </Typography>
            </div>
          )
        })}
      </RadioGroupRadix.Root>
    )
  }
)
