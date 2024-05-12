import { ErrorResponse } from 'react-router-dom'

import { DeckForm, EditDeckType } from '@/features/deck/DeckForm'
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
        //Закидываю notifications TOAST
        // await toast.promise(updateDeck({ data, id: deck?.id }).unwrap(), {
        updateDeck({ data, id: deck?.id }).unwrap()
      }
    } catch (e) {
      const err = e as ErrorResponse

      console.log('Could not update', err)
      //Закидываю notifications TOAST
      // toast.error(err.data.message ?? 'Could not update')
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
