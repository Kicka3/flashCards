import { ReactNode } from 'react'

import { DeckForm } from '@/features/deck/deckForm'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { DeckBodyRequest } from '@/services/decks/decks.types'

/** Контейнерная компонента createDeck для логики запросов */

type Props = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
  trigger?: ReactNode
}

export const CreateDeck = ({ isOpen, onOpenChange, title, trigger }: Props) => {
  const [createDeck] = useCreateDeckMutation()

  const handlerSubmitDeck = (data: DeckBodyRequest) => {
    //Сюда засунуть notifications
    createDeck(data).unwrap()
  }

  return (
    <DeckForm
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={handlerSubmitDeck}
      title={title}
      trigger={trigger}
    />
  )
}
