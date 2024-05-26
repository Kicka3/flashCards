import { ReactNode, useState } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSearch } from '@/common/hooks'
import { Modal } from '@/common/ui/modal'
import { Card, useUpdateCardMutation } from '@/services/cards'

import { CardForm } from '../cardForm'

type Props = {
  card: Card
  title: string
  trigger: ReactNode
}

export const UpdateCard = ({ card, title, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [updateCard] = useUpdateCardMutation()
  const { clearFilter } = useSearch()

  const onUpdateCard = (data: FormData) => {
    try {
      if (card?.id) {
        toast.promise(updateCard({ args: data, id: card.id }), {
          pending: 'In progress',
          success: 'Success',
        })
      }
    } catch (e) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? 'Could not update')
    }
    clearFilter()
  }

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen} title={title} trigger={trigger}>
      <CardForm card={card} onSendData={onUpdateCard} setIsOpen={setIsOpen} title={'Update Card'} />
    </Modal>
  )
}
