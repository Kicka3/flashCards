import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckIcon } from '@/assets/icons/components/Сhecked'
import { Typography } from '@/common/ui'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type Props = {
  backgroundColor?: string
  color?: string
  text?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>(
  ({ backgroundColor, children, className, color, disabled = false, id, text, ...rest }, ref) => {
    const generatedId = useId()
    const domainId = id ?? generatedId

    const classNames = {
      checkBoxLabel: clsx(s.typography, disabled && s.disabled),
      checkboxContainer: clsx(s.checkboxContainer, className),
    }

    /** Временный генератор id для HTMLFor*/
    const generateId = crypto.randomUUID()

    return (
      <div className={classNames.checkboxContainer}>
        <CheckboxRadix.Root
          {...rest}
          className={s.checkbox}
          defaultChecked
          id={domainId}
          ref={ref}
          style={{ backgroundColor, borderColor: color, color }}
        >
          <CheckboxRadix.Indicator>
            <CheckIcon height={18} width={18} />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {text && (
          <Typography
            as={'label'}
            className={classNames.checkBoxLabel}
            htmlFor={id ?? generateId}
            variant={'body2'}
          >
            {text}
          </Typography>
        )}
      </div>
    )
  }
)
