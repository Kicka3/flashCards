import React, { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Close, EyeOffOutline, EyeOutline, Search } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import clsx from 'clsx'

import s from './textField.module.scss'

type VariantInput = 'default' | 'password' | 'search'

type Props<T extends ElementType = 'input'> = {
  errorMessage?: string
  label?: string
  onClearClick?: () => void
  onValueChange?: () => void
  variant?: VariantInput
} & ComponentPropsWithoutRef<T>

export const TextField = React.forwardRef<HTMLInputElement, Props>((props, frowardRef) => {
  const {
    className,
    disabled = false,
    errorMessage = '',
    id,
    label,
    onClearClick,
    onValueChange,
    placeholder,
    value,
    variant = 'default',
    ...rest
  } = props

  const searchVariant = variant === 'search'
  const passwordVariant = variant === 'password'

  const [inputType, setInputType] = useState(passwordVariant ? 'password' : 'text')
  const [passVisibility, setPassVisibility] = useState(false)
  const isShowClearButton = searchVariant && onClearClick && value && !errorMessage

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
  }

  const onShowPassword = () => {
    if (passwordVariant) {
      setInputType(state => (state === 'password' ? 'text' : 'password'))
      setPassVisibility(!passVisibility)
    }
  }

  const clearValue = () => {
    console.log('Зачистить инпут')
  }

  const inputID = id ?? crypto.randomUUID()

  const classNames = {
    buttonIcon: s.buttonIcon,
    container: s.container,
    errorMessage: s.errorMessage,
    iconSearch: clsx(
      s.iconSearch,
      disabled && s.iconSearchDisabled,
      errorMessage && s.iconSearchError
    ),
    input: clsx(
      s.input,
      errorMessage && s.error,
      value && s.inputActive,
      errorMessage && s.inputActiveError
    ),
    inputContainer: clsx(s.textFieldContainer, s[variant]),
    textFieldContainer: clsx(s.container, className),
  }

  return (
    <div className={classNames.container}>
      <div className={classNames.inputContainer}>
        {searchVariant && (
          <Typography
            as={'label'}
            className={classNames.iconSearch}
            htmlFor={inputID}
            variant={'body2'}
          >
            <Search height={'20px'} width={'20px'} />
          </Typography>
        )}

        <input
          className={classNames.input}
          id={inputID}
          {...rest}
          disabled={disabled}
          onChange={onChangeValue}
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
          <div>
            {passVisibility ? (
              <EyeOutline
                className={classNames.buttonIcon}
                height={'20px'}
                onClick={onShowPassword}
                width={'20px'}
              />
            ) : (
              <EyeOffOutline
                className={classNames.buttonIcon}
                height={'20px'}
                onClick={onShowPassword}
                width={'20px'}
              />
            )}
          </div>
        )}

        {isShowClearButton && (
          <button className={classNames.buttonIcon} onClick={onClearClick}>
            <Close height={'18px'} onClick={clearValue} width={'18px'} />
          </button>
        )}
      </div>
      {errorMessage && (
        <Typography className={classNames.errorMessage} variant={'caption'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})
