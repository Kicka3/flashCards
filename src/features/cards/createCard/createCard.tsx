import { Modal } from '@/common/ui/modal'
import { CreateCardArgs, useCreateCardMutation } from '@/services/cards'

import { AddForm } from './addForm/addForm'

/** Контейнерная компонента createCard для логики запросов */

type Props = {
  disabled?: boolean
  id?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const CreateCard = ({ id, isOpen, onOpenChange, title }: Props) => {
  const [createCard, { isLoading: isCardBeingCreated }] = useCreateCardMutation()
  // дописать типы data и в addForm
  const onSubmit = (data: any) => {
    if (id) {
      createCard({ args: data, id })
    }
  }

  return (
    <Modal onOpenChange={onOpenChange} open={isOpen} title={title}>
      <AddForm onOpenChange={onOpenChange} onSubmit={onSubmit} />
    </Modal>
  )
}
