import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckIcon } from '@/assets/icons/checked'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  backgroundColor?: string
  color?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ backgroundColor, children, className, color, id, ...rest }, ref) => {
    const generatedId = useId()
    const domainId = id ?? generatedId

    const classNames = {
      checkboxContainer: clsx(s.checkboxContainer, className),
    }

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
        {children && (
          <label className={s.label} htmlFor={domainId} style={{ color }}>
            {children}
          </label>
        )}
      </div>
    )
  }
)
