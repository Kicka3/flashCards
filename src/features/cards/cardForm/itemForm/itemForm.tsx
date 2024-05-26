import React, { ChangeEvent, useRef } from 'react'
import { Control } from 'react-hook-form'

import { Image, TrashOutline } from '@/assets/icons/components'
import { ImageFile } from '@/common/types/types'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { openFiles } from '@/common/utils'

import s from './ItemForm.module.scss'

import { CardFormValues } from '../CardFormSchema'

type Props = {
  control: Control<CardFormValues, any>
  errorMessage?: string
  image: ImageFile
  label: string
  name: 'answer' | 'question'
  setImage: (image: ImageFile) => void
}

export const ItemForm = ({ control, errorMessage, image, label, name, setImage }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    file && setImage(file)
  }

  const onRemoveImage = () => {
    setImage(null)
  }

  return (
    <div className={s.itemWrapper}>
      <ControlledTextField
        control={control}
        errorMessage={errorMessage}
        label={label}
        name={name}
        variant={'default'}
      />

      <div className={s.imageWrapper}>
        {image === null ? (
          <Image className={s.noImagePicture} />
        ) : (
          <>
            <img
              alt={'questionImg'}
              className={s.image}
              src={typeof image === 'string' ? image : URL.createObjectURL(image)}
            />
            <div className={s.btnWrapper}>
              <Button onClick={onRemoveImage} variant={'icon'}>
                <TrashOutline height={18} width={18} />
              </Button>
            </div>
          </>
        )}
      </div>

      <input className={s.inputImg} onChange={onChangeImage} ref={ref} type={'file'} />
      <Button
        className={s.uploadImgBtn}
        fullWidth
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
          openFiles(ref)
        }}
        variant={'secondary'}
      >
        <Image height={'12px'} width={'12px'} />
        Upload Image
      </Button>
    </div>
  )
}
