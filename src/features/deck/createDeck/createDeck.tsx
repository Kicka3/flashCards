import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

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

  const handlerSubmitDeck = async (data: DeckBodyRequest) => {
    try {
      await toast.promise(createDeck(data).unwrap(), {
        pending: 'In progress',
        success: 'Added',
      })
    } catch (err: any) {
      toast.error(err?.data?.errorMessages[0]?.message ?? 'An unknown error occurred')
    }
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
