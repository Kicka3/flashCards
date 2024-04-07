import { ComponentPropsWithoutRef, useState } from 'react'

import { Close } from '@/assets/icons/components/close'
import { EyeOutline } from '@/assets/icons/components/eyeOutline'
import { Search } from '@/assets/icons/components/search'
import clsx from 'clsx'

import s from './textField.module.scss'

type VariantInput = 'default' | 'password' | 'search'

type InputType = {
  error?: string
  onClearClick?: () => void
  variant?: VariantInput
} & ComponentPropsWithoutRef<'input'>

export const TextField = (props: InputType) => {
  const { className = 'default', error, onClearClick, placeholder, value, variant, ...rest } = props

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

  const classNames: Record<string, string> = {
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
            <Search size={'20px'} />
          </span>
        )}

        <input
          className={classNames.input}
          id={inputID}
          {...rest}
          placeholder={placeholder}
          type={inputType}
          value={value}
        />
        {!searchVariant && <label htmlFor={inputID}>{placeholder}</label>}

        {passwordVariant && (
          <button className={classNames.buttonIcon} onClick={onShowPassword}>
            <EyeOutline size={'20px'} />
          </button>
        )}

        {isShowClearButton && (
          <button className={classNames.buttonIcon} onClick={onClearClick}>
            <Close size={'16px'}></Close>
          </button>
        )}
      </div>

      {error && <div className={classNames.errorMessage}>{error}</div>}
    </div>
  )
}
