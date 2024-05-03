import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Modal } from '@/common/ui/modal'

import s from './deleteDeck.module.scss'

type Props = {
  isDeck: boolean
  name: string
  onOpenChange: () => void
  open: boolean
  title: string
}

export const DeleteDeck = ({ isDeck = true, name, onOpenChange, open, title }: Props) => {
  const DeleteDeckHandler = () => {
    console.log('delete deck')
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={title}>
      <div className={s.deleteForm}>
        <div className={s.bodyText}>
          <Typography variant={'body2'}>{`Do you really want to remove ${name} ?`}</Typography>
          <Typography variant={'body2'}>{`All cards will be deleted.`}</Typography>
        </div>
        <div className={s.BtnGroup}>
          <Button variant={'secondary'}>Cancel</Button>
          {isDeck ? (
            <Button onClick={DeleteDeckHandler}>Delete Pack</Button>
          ) : (
            <Button>Delete Card</Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
