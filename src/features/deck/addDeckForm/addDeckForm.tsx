import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Modal } from '@/common/ui/modal'

import s from './addDeckForm.module.scss'

type AddDeckFormProps = {
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const AddDeckForm = ({ disabled, isOpen, onOpenChange, title }: AddDeckFormProps) => {
  const {
    control,
    // formState: { error },
    handleSubmit,
    // reset,
    // setValue,
  } = useForm({
    defaultValues: { isPrivate: false, newDeckName: '' },
    //Add validation scheme
  })

  const loadImg = () => {
    console.log('load img')
  }

  const onSubmit = () => {
    console.log('create deck')
  }

  return (
    <>
      <Modal className={s.addNewDeckModal} onOpenChange={onOpenChange} open={isOpen} title={title}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField
            control={control}
            disabled={disabled}
            label={'Name pack'}
            name={'newDeckName'}
            variant={'default'}
          />
          <Button
            className={s.UploadImgBtn}
            fullWidth
            icon={<Image height={'12px'} width={'12px'} />}
            onClick={e => {
              e.preventDefault()
              loadImg
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
            <Button disabled={disabled} variant={'primary'}>
              Add new Pack
            </Button>
            <Button disabled={disabled} variant={'secondary'}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
