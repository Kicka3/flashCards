import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'

import s from './deleteForm.module.scss'

type Props = {
  close: () => void
  deleteAction: (id: string) => void
  id: string | undefined
  isDeck: boolean
  isOpen: boolean
  name: string | undefined
  onOpenChange: (value: boolean) => void
  title: string
}

export const DeleteForm = ({
  close,
  deleteAction,
  id,
  isDeck,
  isOpen,
  name,
  onOpenChange,
  title,
}: Props) => {
  /** Кнопка Delete в модалке */
  const DeleteDeckHandler = () => {
    if (id) {
      deleteAction(id)
      onOpenChange(false)
    }
  }

  return (
    <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
      <div className={s.deleteForm}>
        <div className={s.bodyText}>
          <Typography variant={'body2'}>{`Do you really want to remove ${name} ?`}</Typography>
          <Typography variant={'body2'}>{`All cards will be deleted.`}</Typography>
        </div>
        <div className={s.BtnGroup}>
          <Button onClick={close} variant={'secondary'}>
            Cancel
          </Button>
          {isDeck ? (
            <Button onClick={DeleteDeckHandler}>Delete Pack</Button>
          ) : (
            <Button onClick={DeleteDeckHandler}>Delete Card</Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
