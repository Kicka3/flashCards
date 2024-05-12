import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './modal.module.scss'

type Props = {
  children?: ReactNode
  className?: string
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, className, onOpenChange, title, ...rest }: Props) => {
  const handleCloseModal = () => {
    onOpenChange(false)
  }

  const classNames = {
    closeIcon: s.closeIcon,
    contentBox: clsx(className, s.contentBox),
    contentWrapper: s.contentWrapper,
    header: s.header,
    overlay: s.overlay,
  }

  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={classNames.overlay} />
        <DialogPrimitive.Content className={classNames.contentWrapper}>
          {title && (
            <div className={classNames.header}>
              <DialogPrimitive.Title asChild>
                <Typography variant={'h2'}>{title}</Typography>
              </DialogPrimitive.Title>
              <DialogPrimitive.Close aria-label={'Close'} asChild onClick={handleCloseModal}>
                <Close className={classNames.closeIcon} height={'24px'} width={'24px'} />
              </DialogPrimitive.Close>
            </div>
          )}
          <div className={classNames.contentBox}>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
