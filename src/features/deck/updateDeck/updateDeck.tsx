import { ReactNode, useState } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DeckForm, EditDeckType } from '@/features/deck/deckForm'
import { DeckBodyRequest, useUpdateDecksMutation } from '@/services/decks'

type Props = {
  deck?: EditDeckType
  // isOpen?: boolean
  // onOpenChange?: (open: boolean) => void
  // title: string
  trigger?: ReactNode
}

export const UpdateDeck = ({ deck, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [updateDeck, { isLoading }] = useUpdateDecksMutation()
  const title = 'Update Deck'

  const updateEditDeck = async (data: DeckBodyRequest) => {
    try {
      if (deck?.id) {
        await toast.promise(updateDeck({ data, id: deck?.id }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
      }
    } catch (e) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? 'Could not update')
    }
  }

  return (
    <DeckForm
      deck={deck}
      disabled={isLoading}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onSubmitDeck={updateEditDeck}
      title={title}
      trigger={trigger}
    />
  )
}
