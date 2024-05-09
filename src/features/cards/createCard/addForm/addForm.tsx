import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'

import s from './addForm.module.scss'

type Props = {
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: any) => void
}

export const AddForm = ({ onOpenChange, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm({})

  const openFiles = () => {}

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <>
        <ControlledTextField
          control={control}
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
        <ControlledTextField
          control={control}
          label={'Answer'}
          name={'answer'}
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
