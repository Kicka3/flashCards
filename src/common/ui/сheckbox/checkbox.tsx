import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckIcon } from '@/assets/icons/components/Сhecked'
import { Typography } from '@/common/ui'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  backgroundColor?: string
  color?: string
  onChangeValue?: (value: boolean) => void
  text?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const {
      backgroundColor,
      className,
      color,
      defaultChecked,
      disabled = false,
      id,
      text,
      ...rest
    } = props
    const generatedId = useId()
    const domainId = id ?? generatedId

    const classNames = {
      checkBoxLabel: clsx(s.typography, disabled && s.disabled),
      checkboxContainer: clsx(s.checkboxContainer, className),
    }

    return (
      <div className={classNames.checkboxContainer}>
        <CheckboxRadix.Root
          {...rest}
          className={s.checkboxRoot}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={domainId}
          style={{ backgroundColor, borderColor: color, color }}
        >
          <CheckboxRadix.Indicator className={s.checkboxIndicator} ref={ref}>
            <CheckIcon height={18} width={18} />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {text && (
          <Typography
            as={'label'}
            className={classNames.checkBoxLabel}
            htmlFor={id ?? domainId}
            variant={'body2'}
          >
            {text}
          </Typography>
        )}
      </div>
    )
  }
)
