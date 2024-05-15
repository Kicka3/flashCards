import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import { Typography } from '@/common/ui/typography'
import clsx from 'clsx'

import s from './deletePack.module.scss'

type Props = {
  className?: string
  disabled?: boolean
  id?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const DeletePack = ({ className, isOpen, onOpenChange, title }: Props) => {
  const deleteS = (id: string) => {
    console.log(id)
  }

  const computedClass = clsx(s.deleteCard, className)

  return (
    <Modal className={computedClass} onOpenChange={onOpenChange} open={isOpen} title={title}>
      <Typography className={s.subtitle} variant={'sub2'}>
        Do you really want to remove Card?
      </Typography>
      <div className={s.actionsBtnWrapper}>
        <Button onClick={() => onOpenChange(false)} type={'reset'} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={() => deleteS} type={'submit'} variant={'primary'}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
