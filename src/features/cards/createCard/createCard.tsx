import { ReactNode, useState } from 'react'

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

  const [createCard] = useCreateCardMutation()

  const onCreateCard = async (data: FormData) => {
    await createCard({ args: data, id: deckId })
  }

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen} title={title} trigger={trigger}>
      <CardForm onSendData={onCreateCard} setIsOpen={setIsOpen} title={'Add New Card'} />
    </Modal>
  )
}
