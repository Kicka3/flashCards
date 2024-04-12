import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components/close'
import { Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type Props = {
  children?: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Root>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...rest }: Props) => {
  const handleCloseModal = () => {
    rest.onOpenChange(false)
    console.log('close')
  }

  return (
    <Dialog.Root {...rest}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          {title && (
            <div className={'s.header'}>
              <Dialog.Title>
                <Typography variant={'h3'}>{title}</Typography>
              </Dialog.Title>
              <Dialog.Close aria-label={'close'} asChild onClick={handleCloseModal}>
                <Close />
              </Dialog.Close>
            </div>
          )}
          {children}
          <Dialog.Description />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
