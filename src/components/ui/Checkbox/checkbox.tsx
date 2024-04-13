import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckIcon } from '@/assets/icons/checked'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type Props = {
  backgroundColor?: string
  color?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>(
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

// import { ComponentPropsWithoutRef, ReactNode } from 'react'
//
// import { Close } from '@/assets/icons/components/close'
// import { Typography } from '@/components/ui'
// import * as DialogPrimitive from '@radix-ui/react-dialog'
//
// import s from './modal.module.scss'
//
// export default {}
// type ModalProps = {
//     children?: ReactNode
//     onOpenChange: (open: boolean) => void
//     open: boolean
//     title?: string
// } & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>
//
// export const Modal = ({ children, title, ...props }: ModalProps) => {
//     const onCloseHandle = () => {
//         props.onOpenChange(false)
//     }
//
//     return (
//         <DialogPrimitive.Root {...props}>
//             <DialogPrimitive.Portal>
//                 <DialogPrimitive.Overlay className={s.overlay} />
//                 <DialogPrimitive.Content className={s.content}>
//                     {title && (
//                         <div className={s.header}>
//                             <DialogPrimitive.Title>
//                                 <Typography variant={'h2'}>{title}</Typography>
//                             </DialogPrimitive.Title>
//                             <DialogPrimitive.Close aria-label={'Close'}>
//                                 <Close className={s.closeIcon} onClick={onCloseHandle} />
//                             </DialogPrimitive.Close>
//                         </div>
//                     )}
//                     {children}
//                 </DialogPrimitive.Content>
//             </DialogPrimitive.Portal>
//         </DialogPrimitive.Root>
//     )
// }
