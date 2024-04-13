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
            <div className={s.header}>
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
//   children?: ReactNode
//   onOpenChange: (open: boolean) => void
//   open: boolean
//   title?: string
// } & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Dialog>, 'onOpenChange' | 'open'>
//
// export const Modal = ({ children, title, ...props }: ModalProps) => {
//   const onCloseHandle = () => {
//     props.onOpenChange(false)
//   }
//
//   return (
//     <DialogPrimitive.Root {...props}>
//       <DialogPrimitive.Portal>
//         <DialogPrimitive.Overlay className={s.overlay} />
//         <DialogPrimitive.Content className={s.content}>
//           {title && (
//             <div className={s.header}>
//               <DialogPrimitive.Title>
//                 <Typography variant={'h2'}>{title}</Typography>
//               </DialogPrimitive.Title>
//               <DialogPrimitive.Close aria-label={'Close'}>
//                 <Close className={s.closeIcon} onClick={onCloseHandle} />
//               </DialogPrimitive.Close>
//             </div>
//           )}
//           {children}
//         </DialogPrimitive.Content>
//       </DialogPrimitive.Portal>
//     </DialogPrimitive.Root>
//   )
// }
