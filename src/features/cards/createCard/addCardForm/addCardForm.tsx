import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageFile } from '@/common/types/types'
import { Button } from '@/common/ui'
import { Card } from '@/services/cards'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addCardForm.module.scss'

import { AddCardFormValues, addCardSchema } from './addCardSchema'
import { AddItemForm } from './addItemForm'

type Props = {
  card?: Card
  onCreateCard: (data: FormData) => void
  onOpenChange: (isOpen: boolean) => void
}

export const AddCardForm = ({ card, onCreateCard, onOpenChange }: Props) => {
  const [questionImg, setQuestionImg] = useState<ImageFile>(card?.questionImg || null)
  const [answerImg, setAnswerImg] = useState<ImageFile>(card?.answerImg || null)
  const { control, handleSubmit } = useForm<AddCardFormValues>({
    defaultValues: {
      answer: card?.answer || '',
      question: card?.question || '',
    },
    resolver: zodResolver(addCardSchema),
  })

  const onFormSubmit = (data: AddCardFormValues) => {
    const formData = new FormData()
    const sentQuestionImg = questionImg === null ? '' : questionImg
    const sentAnswerImg = answerImg === null ? '' : answerImg

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', sentQuestionImg)
    formData.append('answerImg', sentAnswerImg)

    onCreateCard(formData)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
      <AddItemForm control={control} image={questionImg} setImage={setQuestionImg} />
      <AddItemForm control={control} image={answerImg} setImage={setAnswerImg} />

      <div className={s.actionsBtnWrapper}>
        <Button type={'submit'} variant={'primary'}>
          Add new Card
        </Button>
        <Button onClick={() => onOpenChange(false)} type={'reset'} variant={'secondary'}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
