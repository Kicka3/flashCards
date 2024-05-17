import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DeckForm, EditDeckType } from '@/features/deck/deckForm'
import { DeckBodyRequest, useUpdateDecksMutation } from '@/services/decks'

type Props = {
  deck?: EditDeckType
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const UpdateDeck = ({ deck, isOpen, onOpenChange, title }: Props) => {
  const [updateDeck, { isLoading }] = useUpdateDecksMutation()

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
      onOpenChange={onOpenChange}
      onSubmitDeck={updateEditDeck}
      title={title}
    />
  )
}
