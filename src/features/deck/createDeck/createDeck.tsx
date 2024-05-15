import { ReactNode, useState } from 'react'

import { DeckForm } from '@/features/deck/deckForm'
import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { DeckBodyRequest } from '@/services/decks/decks.types'

type Props = {
  disabled?: boolean
  title: string
  trigger?: ReactNode
}

export const CreateDeck = ({ title, trigger }: Props) => {
  const [createDeck] = useCreateDeckMutation()

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handlerSubmitDeck = (data: DeckBodyRequest) => {
    //Сюда засунуть notifications
    createDeck(data).unwrap()
  }

  return (
    <DeckForm
      isOpen={isOpenModal}
      onOpenChange={setIsOpenModal}
      onSubmitDeck={handlerSubmitDeck}
      title={title}
      trigger={trigger}
    />
  )
}
