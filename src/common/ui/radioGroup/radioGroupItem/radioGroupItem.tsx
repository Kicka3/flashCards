import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Typography } from '@/common/ui'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroupItem.module.scss'

type ItemProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>

export const RadioItem = forwardRef<ElementRef<typeof RadioGroupRadix.Item>, ItemProps>(
  ({ className, id, label, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    const generatedId = useId()
    const finalId = id ?? generatedId

    return (
      <div className={classNames} key={generatedId}>
        <RadioGroupRadix.Item className={s.item} id={finalId} {...rest} ref={ref}>
          <RadioGroupRadix.Indicator className={s.indicator} />
        </RadioGroupRadix.Item>
        <Typography as={'label'} className={s.label} htmlFor={finalId} variant={'body2'}>
          {label}
        </Typography>
      </div>
    )
  }
)
