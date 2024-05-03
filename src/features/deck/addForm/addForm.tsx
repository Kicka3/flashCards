import { RefObject, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Modal } from '@/common/ui/modal'
import { AddDeckFormValues, addDeckSchema } from '@/features/deck/utils/addDeckSchema'
import { DeckBodyRequest } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './addForm.module.scss'

/** form Компонента */

export type EditDeckType = {
  cover: null | string | undefined
  id?: string
  isPrivate: boolean
  name: string
}

type Props = {
  deck?: EditDeckType
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmitDeck: (data: DeckBodyRequest) => void
  title: string
}

export const AddForm = ({ deck, disabled, isOpen, onOpenChange, onSubmitDeck, title }: Props) => {
  const [photo, setPhoto] = useState<File | null | string>(null)

  const fileinputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddDeckFormValues>({
    defaultValues: { isPrivate: false, name: '' },
    resolver: zodResolver(addDeckSchema),
  })

  /** Когда компонента монитурется, проверяем deck и устанавливаем занчения для полей */
  useEffect(() => {
    if (deck) {
      setValue('name', deck.name || '')
      setValue('isPrivate', deck.isPrivate || false)
      setPhoto(deck.cover ?? null)
    }
  }, [deck, setValue])

  const onSubmit = (data: AddDeckFormValues) => {
    onOpenChange(false)

    const deckBodyReq: DeckBodyRequest = { ...data, cover: photo }

    onSubmitDeck(deckBodyReq)
    setPhoto(null)
    reset()
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
      <Modal className={s.addNewDeckModal} onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            disabled={disabled}
            errorMessage={errors.name?.message}
            label={'Name pack'}
            name={'name'}
            variant={'default'}
          />
          <Button
            className={s.UploadImgBtn}
            fullWidth
            icon={<Image height={'12px'} width={'12px'} />}
            onClick={e => {
              e.preventDefault()
              openFiles()
            }}
            variant={'secondary'}
          >
            Upload Image
          </Button>
          <ControlledCheckbox
            control={control}
            disabled={disabled}
            name={'isPrivate'}
            text={'Private pack'}
          />
          <div className={s.ActionsBtnWrapper}>
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
