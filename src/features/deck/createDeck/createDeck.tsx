import { AddDeckForm } from '@/features/deck/addDeckForm'

/** Контейнерная компонента createDeck для логики запросов */

type Props = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const CreateDeck = ({ isOpen, onOpenChange, title }: Props) => {
  const handlerSubmitDeck = () => {
    /** Тут будут обрабатываться notifications и запросы на сервер */
    console.log('ОТПРАВЛЯЮ ФОРМУ')
  }

  return (
    <AddDeckForm
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onSubmitDeck={handlerSubmitDeck}
      title={title}
    />
  )
}
