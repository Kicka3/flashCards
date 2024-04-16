import React, { ComponentPropsWithoutRef, useState } from 'react'

import { Close, EyeOutline, Search } from '@/assets/icons/components'
import { Typography } from '@/components/ui'
import clsx from 'clsx'

import s from './textField.module.scss'

type VariantInput = 'default' | 'password' | 'search'

type InputType = {
  error?: string
  label?: string
  onClearClick?: () => void
  variant?: VariantInput
} & ComponentPropsWithoutRef<'input'>

export const TextField = React.forwardRef<HTMLInputElement, InputType>((props, frowardRef) => {
  const {
    className,
    error,
    id,
    label,
    onClearClick,
    placeholder,
    value,
    variant = 'default',
    ...rest
  } = props

  const searchVariant = variant === 'search'
  const passwordVariant = variant === 'password'

  const inputID = crypto.randomUUID()

  const initialInputType = !passwordVariant ? 'text' : 'password'

  const [inputType, setInputType] = useState(initialInputType)

  const isShowClearButton = searchVariant && onClearClick && value && !error

  const onShowPassword = () => {
    if (passwordVariant) {
      setInputType(state => (state === 'password' ? 'type' : 'password'))
    }
  }

  const classNames = {
    buttonIcon: s.buttonIcon,
    container: s.container,
    errorMessage: s.errorMessage,
    iconSearch: clsx(s.iconSearch, !value ? s.iconSearchDev : ''),
    input: clsx(s.input, error ? s.error : '', value && s.inputActive),
    inputContainer: clsx(s.textFieldContainer, s[variant]),
    textFieldContainer: clsx(s.container, className),
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.inputContainer}>
        {searchVariant && (
          <span className={classNames.iconSearch}>
            <Search height={'20px'} width={'20px'} />
          </span>
        )}

        <input
          className={classNames.input}
          id={id ?? inputID}
          {...rest}
          placeholder={placeholder}
          ref={frowardRef}
          type={inputType}
          value={value}
        />
        {!searchVariant && (
          <label className={s.label} htmlFor={inputID}>
            {placeholder}
          </label>
        )}

        {passwordVariant && (
          <button className={classNames.buttonIcon} onClick={onShowPassword}>
            <EyeOutline height={'20px'} width={'20px'} />
          </button>
        )}

        {isShowClearButton && (
          <button className={classNames.buttonIcon} onClick={onClearClick}>
            <Close height={'18px'} width={'18px'} />
          </button>
        )}
      </div>
      {error && (
        <Typography className={classNames.errorMessage} variant={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
})
