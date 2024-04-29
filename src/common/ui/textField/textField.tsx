// import React, { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'
//
// import { Close, EyeOffOutline, EyeOutline, Search } from '@/assets/icons/components'
// import { Typography } from '@/common/ui'
// import clsx from 'clsx'
//
// import s from './textField.module.scss'
//
// type VariantInput = 'default' | 'password' | 'search'
//
// export type TextFieldProps<T extends ElementType = 'input'> = {
//   errorMessage?: string
//   label?: string
//   onChange?: (value: string) => void
//   variant?: VariantInput
// } & Omit<ComponentPropsWithoutRef<T>, 'onChange'>
//
// export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, frowardRef) => {
//   const {
//     className,
//     disabled = false,
//     errorMessage = '',
//     id,
//     label,
//     onChange,
//     placeholder,
//     value,
//     variant = 'default',
//     ...rest
//   } = props
//
//   const searchVariant = variant === 'search'
//   const passwordVariant = variant === 'password'
//
//   const [inputType, setInputType] = useState(passwordVariant ? 'password' : 'text')
//   const [passVisibility, setPassVisibility] = useState(false)
//   const [inputValue, setInputValue] = useState('')
//   const isShowClearButton = searchVariant && inputValue && !errorMessage
//
//   const onShowPassword = () => {
//     if (passwordVariant) {
//       setInputType(state => (state === 'password' ? 'text' : 'password'))
//       setPassVisibility(!passVisibility)
//     }
//   }
//
//   const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
//     onChange && onChange(e.currentTarget.value)
//     setInputValue(e.currentTarget.value)
//   }
//
//   const clearValue = () => {
//     setInputValue('')
//     onChange && onChange('')
//   }
//
//   const inputID = id ?? crypto.randomUUID()
//
//   const classNames = {
//     buttonIcon: s.buttonIcon,
//     container: s.container,
//     errorMessage: s.errorMessage,
//     eyeIcon: clsx(s.eyeIcon, errorMessage && s.eyeIconError),
//     iconSearch: clsx(
//       s.iconSearch,
//       disabled && s.iconSearchDisabled,
//       errorMessage && s.iconSearchError
//     ),
//     input: clsx(
//       s.input,
//       errorMessage && s.error,
//       value && s.inputActive,
//       errorMessage && s.inputActiveError
//     ),
//     inputContainer: clsx(s.textFieldContainer, s[variant]),
//     textFieldContainer: clsx(s.container, className),
//     textFieldLabel: clsx(s.label, disabled && s.label_disabled),
//   }
//
//   return (
//     <div className={classNames.container}>
//       <div className={classNames.inputContainer}>
//         {searchVariant ? (
//           <Typography
//             as={'label'}
//             className={classNames.iconSearch}
//             htmlFor={inputID}
//             variant={'body2'}
//           >
//             <Search height={'20px'} width={'20px'} />
//           </Typography>
//         ) : (
//           <Typography as={'label'} className={classNames.textFieldLabel} variant={'body2'}>
//             {label}
//           </Typography>
//         )}
//
//         <input
//           className={classNames.input}
//           id={inputID}
//           {...rest}
//           disabled={disabled}
//           name={'controlledTextField'}
//           onChange={onChangeValue}
//           placeholder={placeholder}
//           ref={frowardRef}
//           type={inputType}
//           value={value}
//         />
//
//         {passwordVariant && (
//           <div className={classNames.eyeIcon}>
//             {passVisibility ? (
//               <EyeOutline
//                 className={classNames.buttonIcon}
//                 height={'20px'}
//                 onClick={onShowPassword}
//                 width={'20px'}
//               />
//             ) : (
//               <EyeOffOutline
//                 className={classNames.buttonIcon}
//                 height={'20px'}
//                 onClick={onShowPassword}
//                 width={'20px'}
//               />
//             )}
//           </div>
//         )}
//
//         {isShowClearButton && (
//           <button className={classNames.buttonIcon} onClick={clearValue}>
//             <Close height={'18px'} width={'18px'} />
//           </button>
//         )}
//       </div>
//       {errorMessage && (
//         <Typography className={classNames.errorMessage} variant={'caption'}>
//           {errorMessage}
//         </Typography>
//       )}
//     </div>
//   )
// })
/** НЕ УДАЛЯТЬ КОД ВЫШЕ! */

import React, { ChangeEvent, ComponentPropsWithoutRef, ElementType, useState } from 'react'

import { Close, EyeOffOutline, EyeOutline, Search } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import clsx from 'clsx'

import s from './textField.module.scss'

type VariantInput = 'default' | 'password' | 'search'

export type TextFieldProps<T extends ElementType = 'input'> = {
  errorMessage?: string
  label?: string
  onChange?: (value: string) => void
  variant?: VariantInput
} & Omit<ComponentPropsWithoutRef<T>, 'onChange'>

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (props, forwardedRef) => {
    const {
      className,
      disabled = false,
      errorMessage = '',
      id,
      label,
      onChange,
      placeholder,
      variant = 'default',
      ...rest
    } = props

    const searchVariant = variant === 'search'
    const passwordVariant = variant === 'password'

    const [inputType, setInputType] = useState(passwordVariant ? 'password' : 'text')
    const [passVisibility, setPassVisibility] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const isShowClearButton = searchVariant && inputValue && !errorMessage

    const onShowPassword = () => {
      if (passwordVariant) {
        setInputType(state => (state === 'password' ? 'text' : 'password'))
        setPassVisibility(!passVisibility)
      }
    }

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
      onChange && onChange(e.currentTarget.value)
    }

    const clearValue = () => {
      setInputValue('')
      onChange && onChange('')
    }

    const inputID = id ?? crypto.randomUUID()

    const classNames = {
      buttonIcon: s.buttonIcon,
      container: s.container,
      errorMessage: s.errorMessage,
      eyeIcon: clsx(s.eyeIcon, errorMessage && s.eyeIconError),
      iconSearch: clsx(
        s.iconSearch,
        disabled && s.iconSearchDisabled,
        errorMessage && s.iconSearchError
      ),
      input: clsx(
        s.input,
        errorMessage && s.error,
        inputValue && s.inputActive,
        errorMessage && s.inputActiveError
      ),
      inputContainer: clsx(s.textFieldContainer, s[variant]),
      textFieldContainer: clsx(s.container, className),
      textFieldLabel: clsx(s.label, disabled && s.label_disabled),
    }

    return (
      <div className={classNames.container}>
        <div className={classNames.inputContainer}>
          {searchVariant ? (
            <Typography
              as={'label'}
              className={classNames.iconSearch}
              htmlFor={inputID}
              variant={'body2'}
            >
              <Search height={'20px'} width={'20px'} />
            </Typography>
          ) : (
            <Typography as={'label'} className={classNames.textFieldLabel} variant={'body2'}>
              {label}
            </Typography>
          )}

          <input
            className={classNames.input}
            id={inputID}
            {...rest}
            disabled={disabled}
            name={'controlledTextField'}
            onChange={onChangeValue}
            placeholder={placeholder}
            ref={forwardedRef}
            type={inputType}
            value={inputValue}
          />

          {passwordVariant && (
            <div className={classNames.eyeIcon}>
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
            <button className={classNames.buttonIcon} onClick={clearValue}>
              <Close height={'18px'} width={'18px'} />
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
  }
)
