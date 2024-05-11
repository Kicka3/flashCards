import { Modal } from '@/common/ui/modal'
import { Card, useCreateCardMutation } from '@/services/cards'

import { CardForm } from '../cardForm'

type Props = {
  card?: Card
  deckId: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const CreateCard = ({ card, deckId, isOpen, onOpenChange, title }: Props) => {
  const [createCard] = useCreateCardMutation()

  const onCreateCard = (data: FormData) => {
    createCard({ args: data, id: deckId })
  }

  return (
    <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
      <CardForm card={card} onCreateCard={onCreateCard} onOpenChange={onOpenChange} />
    </Modal>
  )
}
