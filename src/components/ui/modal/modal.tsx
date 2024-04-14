import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components/close'
import { Typography } from '@/components/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type Props = {
  children?: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...rest }: Props) => {
  const handleCloseModal = () => {
    rest.onOpenChange(false)
  }

  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={s.overlay} />
        <DialogPrimitive.Content className={s.content}>
          {title && (
            <div className={s.header}>
              <DialogPrimitive.Title>
                <Typography variant={'h2'}>{title}</Typography>
              </DialogPrimitive.Title>
              <DialogPrimitive.Close aria-label={'Close'} onClick={handleCloseModal}>
                <Close />
              </DialogPrimitive.Close>
            </div>
          )}
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
