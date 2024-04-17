import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components'
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

  const classNames = {
    closeIcon: s.closeIcon,
    contentBox: s.contentBox,
    contentWrapper: s.contentWrapper,
    header: s.header,
    overlay: s.overlay,
  }

  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Portal forceMount>
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
