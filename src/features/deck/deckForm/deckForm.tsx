import React, { ReactNode, RefObject, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Image, TrashOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { ImageLoader } from '@/common/ui/imageLoader'
import { Modal } from '@/common/ui/modal'
import { AddDeckFormValues, addDeckSchema } from '@/features/deck/utils/addDeckSchema'
import { DeckBodyRequest } from '@/services/decks/decks.types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './deckForm.module.scss'

export type EditDeckType = {
  cover: null | string | undefined
  id: string
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
  trigger?: ReactNode
}

export const DeckForm = ({
  deck,
  disabled,
  isOpen,
  onOpenChange,
  onSubmitDeck,
  title,
  trigger,
}: Props) => {
  /** Стейт для фото */
  const [photo, setPhoto] = useState<File | null | string>(deck?.cover || null)

  const fileInputRef: RefObject<HTMLInputElement> = useRef(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddDeckFormValues>({
    defaultValues: { isPrivate: deck?.isPrivate || false, name: deck?.name || '' },
    resolver: zodResolver(addDeckSchema),
  })

  /** Отправляем на сервер */
  const onSubmit = async (data: AddDeckFormValues) => {
    onOpenChange(false)

    const deckBodyReq: DeckBodyRequest = { ...data, cover: photo }

    onSubmitDeck(deckBodyReq)
    setPhoto(null)
    reset()
  }

  /** Загрузка изображений Взять у Володи*/
  const openFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const removeCoverImg = () => {
    setPhoto(null)
  }
  const uploadedImg = photo instanceof File ? URL.createObjectURL(photo) : photo

  const handlerClose = () => {
    onOpenChange(false)
  }

  return (
    <Modal
      className={s.addNewDeckModal}
      onOpenChange={onOpenChange}
      open={isOpen}
      title={title}
      trigger={trigger}
    >
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          disabled={disabled}
          errorMessage={errors.name?.message}
          label={'Name pack'}
          name={'name'}
          variant={'default'}
        />
        <div>
          {uploadedImg && (
            <div className={s.deckImgWrapper}>
              <img alt={'Image not found'} className={s.deckImg} src={uploadedImg} />
              <div className={s.btnWrapper}>
                <Button className={s.btnRemoveCover} onClick={removeCoverImg} variant={'link'}>
                  <TrashOutline height={18} width={18} />
                </Button>
              </div>
            </div>
          )}
          <ImageLoader className={s.openFilesInput} ref={fileInputRef} setPhoto={setPhoto} />
        </div>
        <Button
          className={s.UploadImgBtn}
          fullWidth
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            openFiles()
          }}
          variant={'secondary'}
        >
          <Image height={'16px'} width={'16px'} />
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
            {title}
          </Button>
          <Button disabled={disabled} onClick={handlerClose} type={'reset'} variant={'secondary'}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
