import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { DeckBodyRequest } from '@/services/decks/decks.types'

import { AddForm } from '../addForm'

/** Контейнерная компонента createDeck для логики запросов */

type Props = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const CreateDeck = ({ isOpen, onOpenChange, title }: Props) => {
  const [createDeck] = useCreateDeckMutation()
  const handlerSubmitDeck = (data: DeckBodyRequest) => {
    createDeck(data)
  }

  return (
    <AddForm
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={handlerSubmitDeck}
      title={title}
    />
  )
}