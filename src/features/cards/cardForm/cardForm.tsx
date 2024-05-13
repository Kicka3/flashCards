import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageFile } from '@/common/types/types'
import { Button } from '@/common/ui'
import { Card } from '@/services/cards'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './cardForm.module.scss'

import { CardFormValues, CardSchema } from './CardFormSchema'
import { ItemForm } from './itemForm'

type Props = {
  card?: Card
  onSendData: (data: FormData) => void
  setIsOpen: (isOpen: boolean) => void
  title: string
}

export const CardForm = ({ card, onSendData, setIsOpen, title }: Props) => {
  const [questionImg, setQuestionImg] = useState<ImageFile>(card?.questionImg || null)
  const [answerImg, setAnswerImg] = useState<ImageFile>(card?.answerImg || null)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CardFormValues>({
    defaultValues: {
      answer: card?.answer || '',
      question: card?.question || '',
    },

    resolver: zodResolver(CardSchema),
  })

  const onFormSubmit = (data: CardFormValues) => {
    const formData = new FormData()
    const sentQuestionImg = questionImg === null ? '' : questionImg
    const sentAnswerImg = answerImg === null ? '' : answerImg

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', sentQuestionImg)
    formData.append('answerImg', sentAnswerImg)
    setIsOpen(false)

    onSendData(formData)
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
      <ItemForm
        control={control}
        errorMessage={errors.question?.message}
        image={questionImg}
        label={'Question'}
        name={'question'}
        setImage={setQuestionImg}
      />
      <ItemForm
        control={control}
        errorMessage={errors.answer?.message}
        image={answerImg}
        label={'Answer'}
        name={'answer'}
        setImage={setAnswerImg}
      />

      <div className={s.actionsBtnWrapper}>
        <Button type={'submit'} variant={'primary'}>
          {title}
        </Button>
        <Button onClick={() => setIsOpen(false)} type={'reset'} variant={'secondary'}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
