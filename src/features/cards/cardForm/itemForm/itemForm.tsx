import { ChangeEvent, useRef } from 'react'
import { Control } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { ImageFile } from '@/common/types/types'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { openFiles } from '@/common/utils'

import s from './ItemForm.module.scss'

import { AddCardFormValues } from '../CardFormSchema'

type Props = {
  control: Control<AddCardFormValues, any>
  image: ImageFile
  label: string
  name: 'answer' | 'question'
  setImage: (image: ImageFile) => void
}

export const ItemForm = ({ control, image, label, name, setImage }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    file && setImage(file)
  }

  return (
    <div className={s.itemWrapper}>
      <ControlledTextField control={control} label={label} name={name} variant={'default'} />

      <div className={s.imageWrapper}>
        {image === null ? (
          <Image />
        ) : (
          <img
            alt={'questionImg'}
            className={s.image}
            src={typeof image === 'string' ? image : URL.createObjectURL(image)}
          />
        )}
      </div>

      <input className={s.inputImg} onChange={onChangeImage} ref={ref} type={'file'} />
      <Button
        className={s.uploadImgBtn}
        fullWidth
        onClick={e => {
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
