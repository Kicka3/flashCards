import { ReactNode, useState } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useSearch } from '@/common/hooks'
import { Modal } from '@/common/ui/modal'
import { useCreateCardMutation } from '@/services/cards'

import { CardForm } from '../cardForm'

type Props = {
  deckId: string
  title: string
  trigger: ReactNode
}

export const CreateCard = ({ deckId, title, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { clearFilter } = useSearch()
  const [createCard] = useCreateCardMutation()

  const onCreateCard = async (data: FormData) => {
    try {
      if (deckId) {
        await toast.promise(createCard({ args: data, id: deckId }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
      }
    } catch (e) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? 'Could not update')
    }
    clearFilter()
  }

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen} title={title} trigger={trigger}>
      <CardForm onSendData={onCreateCard} setIsOpen={setIsOpen} title={'Add New Card'} />
    </Modal>
  )
}
