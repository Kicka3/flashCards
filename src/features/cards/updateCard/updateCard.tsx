import { ReactNode, useState } from 'react'

import { Modal } from '@/common/ui/modal'
import { Card, useUpdateCardMutation } from '@/services/cards'

import { CardForm } from '../cardForm'

/** Контейнерная компонента createCard для логики запросов */
type Props = {
  card: Card
  title: string
  trigger: ReactNode
}

export const UpdateCard = ({ card, title, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [updateCard] = useUpdateCardMutation()

  const onUpdateCard = (data: FormData) => {
    updateCard({ args: data, id: card.id })
  }

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen} title={title} trigger={trigger}>
      <CardForm card={card} onSendData={onUpdateCard} setIsOpen={setIsOpen} title={'Update Card'} />
    </Modal>
  )
}
