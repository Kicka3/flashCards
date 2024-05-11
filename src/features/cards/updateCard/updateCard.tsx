import { Modal } from '@/common/ui/modal'
import { Card, useUpdateCardMutation } from '@/services/cards'

import { CardForm } from '../cardForm'

/** Контейнерная компонента createCard для логики запросов */
type Props = {
  card: Card
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const UpdateCard = ({ card, isOpen, onOpenChange, title }: Props) => {
  const [updateCard] = useUpdateCardMutation()

  const onUpdateCard = (data: FormData) => {
    updateCard({ args: data, id: card.id })
  }

  return (
    <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
      <CardForm card={card} onCreateCard={onUpdateCard} onOpenChange={onOpenChange} />
    </Modal>
  )
}
