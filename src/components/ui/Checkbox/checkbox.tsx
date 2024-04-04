import { ComponentPropsWithoutRef } from 'react'

import * as CheckBox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  autoSize?: boolean
  backgroundColor?: string
  checked: boolean
  color?: string
  disabled?: boolean
  onChangeChecked: (checked: boolean) => void
  size?: number
} & ComponentPropsWithoutRef<'input'>

export const Checkbox = (props: CheckboxProps) => {
  const {
    autoSize,
    backgroundColor = 'white',
    checked,
    children,
    color,
    disabled,
    onChangeChecked,
    size = 30,
  } = props

  const classNames = {
    autoSizeStyle: clsx({ [s.autoSize]: autoSize }),
    checkboxContainer: clsx(disabled && s.disabled, s.checkboxContainer),
    chekboxStyles: clsx(autoSize && s.autoSize, s.checkbox, disabled && s.disabled),
  }

  const domainSize = autoSize ? `1rem` : `${size}px`

  const onChangeCallback = () => {
    onChangeChecked(!checked)
  }

  return (
    <div className={classNames.checkboxContainer} style={{ color }}>
      <div
        className={s.markWrapper}
        style={
          autoSize
            ? { height: `2rem`, width: `2rem` }
            : { height: `${2 * size}px`, width: `${2 * size}px` }
        }
      >
        <CheckBox.Root
          className={classNames.chekboxStyles}
          disabled={disabled}
          onClick={() => onChangeCallback()}
          style={
            checked
              ? { border: 'none', height: domainSize, width: domainSize }
              : {
                  border: `2px solid ${backgroundColor}`,
                  height: domainSize,
                  width: domainSize,
                }
          }
        >
          <CheckBox.Indicator style={{ backgroundColor: color }}>
            {checked && (
              <svg
                height={'100%'}
                viewBox={'0 0 18 18'}
                width={'100%'}
                xmlns={'http://www.w3.org/2000/svg'}
              >
                <path
                  d={
                    'M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z'
                  }
                  fill={backgroundColor}
                ></path>
              </svg>
            )}
          </CheckBox.Indicator>
        </CheckBox.Root>
      </div>

      {children && <span className={s.span}>{children}</span>}
    </div>
  )
}
