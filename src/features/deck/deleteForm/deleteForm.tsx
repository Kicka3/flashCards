import { ReactNode, useState } from 'react'

import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'
import { Typography } from '@/common/ui/typography'

import s from './deleteForm.module.scss'

type Props = {
  id: string
  name: string
  onDeleteDeck: (id: string) => void
  trigger: ReactNode
}

export const DeleteForm = ({ id, name, onDeleteDeck, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const title = 'Delete Pack'
  /** Кнопка Delete в модалке */
  const DeleteDeckHandler = () => {
    onDeleteDeck(id)
    setIsOpen(false)
  }

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen} title={title} trigger={trigger}>
      <div className={s.deleteForm}>
        <div className={s.bodyText}>
          <Typography variant={'body2'}>{`Do you really want to remove ${name} ?`}</Typography>
          <Typography variant={'body2'}>{`All cards will be deleted.`}</Typography>
        </div>
        <div className={s.BtnGroup}>
          <Button onClick={() => setIsOpen(false)} variant={'secondary'}>
            Cancel
          </Button>

          <Button onClick={DeleteDeckHandler}>Delete Card</Button>
        </div>
      </div>
    </Modal>
  )
}
