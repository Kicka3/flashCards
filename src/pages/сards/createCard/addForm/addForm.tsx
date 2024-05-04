import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Modal } from '@/common/ui/modal'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addForm.module.scss'

import { AddCardFormValues, addCardSchema } from './addCardSchema'

/** form Компонента */
export type EditCardType = {
  // cover: null | string | undefined
  // id?: string
  // isPrivate: boolean
  // name: string
}

type Props = {
  card: EditCardType
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitCard: (data: any) => void
  title: string
}

export const AddForm = ({ card, disabled, isOpen, onOpenChange, onSubmitCard, title }: Props) => {
  const [questionImg, setQuestionImg] = useState<UploadImage>(card?.questionImg || null)
  const [answerImg, setAnswerImg] = useState<UploadImage>(card?.answerImg || null)

  const answerFileRef = useRef<HTMLInputElement>(null)
  const questionFileRef = useRef<HTMLInputElement>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddCardFormValues>({
    defaultValues: { answer: card?.answer || '', question: card?.question || '' },
    resolver: zodResolver(addCardSchema),
  })

  const isStringAnswerImg = typeof answerImg === 'string'
  const isStringQuestionImg = typeof questionImg === 'string'

  const onSubmit = (data: AddCardFormValues) => {
    const formData = new FormData()
    const sentQuestionImg = questionImg === null ? '' : questionImg
    const sentAnswerImg = answerImg === null ? '' : answerImg

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    !isStringQuestionImg && formData.append('questionImg', sentQuestionImg)
    !isStringAnswerImg && formData.append('answerImg', sentAnswerImg)
    onSubmit(formData)
    // onOpenChange(false)

    // const deckBodyReq: any = { ...data, cover: photo }

    // onSubmitCard(deckBodyReq)
    // setPhoto(null)
    // reset()
  }

  /** Добавить загрузку изображений */
  const openFiles = () => {
    if (fileinputRef.current) {
      fileinputRef.current.click()
    }
  }

  const HandlerClose = () => {
    onOpenChange(false)
  }

  return (
    <>
      <Modal className={s.addNewCardModal} onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <>
            <ControlledTextField
              control={control}
              disabled={disabled}
              errorMessage={errors.name?.message}
              label={'Question'}
              name={'question'}
              variant={'default'}
            />
            <Image />
            <Button
              className={s.uploadImgBtn}
              fullWidth
              onClick={e => {
                e.preventDefault()
                openFiles()
              }}
              variant={'secondary'}
            >
              <Image height={'12px'} width={'12px'} />
              Upload Image
            </Button>
          </>
          <>
            <ControlledTextField
              control={control}
              disabled={disabled}
              errorMessage={errors.name?.message}
              label={'Answer'}
              name={'name'}
              variant={'default'}
            />
            <Image />
            <Button
              className={s.uploadImgBtn}
              fullWidth
              onClick={e => {
                e.preventDefault()
                openFiles()
              }}
              variant={'secondary'}
            >
              <Image height={'12px'} width={'12px'} />
              Upload Image
            </Button>
          </>
          <div className={s.actionsBtnWrapper}>
            <Button disabled={disabled} type={'submit'} variant={'primary'}>
              Add new Pack
            </Button>
            <Button disabled={disabled} onClick={HandlerClose} type={'reset'} variant={'secondary'}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
