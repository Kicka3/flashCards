// import { DeckForm } from '@/pages/сards/createCard/addForm2'

import { AddForm } from './addForm/addForm2'

/** Контейнерная компонента createCard для логики запросов */

type Props = {
  disabled?: boolean
  id?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const CreateCard = ({ id, isOpen, onOpenChange, title }: Props) => {
  // const [createNewCard] = useCreateDeckMutation()
  // req data type
  const handlerSubmitCard = (data: any) => {
    // createNewCard(data)
  }

  return (
    <AddForm
      id={id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      // onSubmitCard={handlerSubmitCard}
      title={title}
    />
  )
}
