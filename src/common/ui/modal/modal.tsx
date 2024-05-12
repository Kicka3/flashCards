import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DialogPrimitive from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { ModalContent } from './content/content'

const { Dialog, Root, Trigger } = DialogPrimitive

type Props = {
  children?: ReactNode
  className?: string
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
  trigger?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, onOpenChange, open, trigger, ...rest }: Props) => {
  return (
    <Root onOpenChange={onOpenChange} open={open}>
      <Trigger className={s.modalTrigger}>{trigger}</Trigger>
      <ModalContent setIsOpen={onOpenChange} {...rest}>
        {children}
      </ModalContent>
    </Root>
  )
}
