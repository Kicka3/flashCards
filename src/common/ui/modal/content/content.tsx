import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close as CloseIcon } from '@/assets/icons/components'
import { Typography } from '@/common/ui/typography'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './content.module.scss'

const { Close, Content, Dialog, Overlay, Portal, Title } = DialogPrimitive

type Props = {
  children?: ReactNode
  className?: string
  setIsOpen: (open: boolean) => void
  title?: string
  trigger?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Dialog>, 'setIsOpen'>

export const ModalContent = ({
  children,
  className,
  setIsOpen,
  title,
  trigger,
  ...rest
}: Props) => {
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const classNames = {
    closeIcon: s.closeIcon,
    contentBox: clsx(className, s.contentBox),
    contentWrapper: s.contentWrapper,
    header: s.header,
    overlay: s.overlay,
  }

  return (
    <Portal>
      <Overlay className={classNames.overlay} />
      <Content className={classNames.contentWrapper} {...rest}>
        {title && (
          <div className={classNames.header}>
            <Title asChild>
              <Typography variant={'h2'}>{title}</Typography>
            </Title>
            <Close aria-label={'Close'} asChild onClick={handleCloseModal}>
              <CloseIcon className={classNames.closeIcon} height={'24px'} width={'24px'} />
            </Close>
          </div>
        )}
        <div className={classNames.contentBox}>{children}</div>
      </Content>
    </Portal>
  )
}
