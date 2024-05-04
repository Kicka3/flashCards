import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { Modal } from '@/common/ui/modal'
import { CreateCardArgs, useCreateCardMutation } from '@/services/cards'

import s from './addForm.module.scss'

type Props = {
  id?: string
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

export const AddForm = ({ id, isOpen, onOpenChange, title }: Props) => {
  const { control, handleSubmit } = useForm({})
  const [createCard, { isLoading: isCardBeingCreated }] = useCreateCardMutation()
  // дописать типы
  const onSubmit = (data: any) => {
    if (id) {
      createCard({ args: data, id })
    }
  }

  const HandlerClose = () => {
    onOpenChange(false)
  }

  const openFiles = () => {}

  return (
    <>
      <Modal className={s.addNewCardModal} onOpenChange={onOpenChange} open={isOpen} title={title}>
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
              Add new Pack
            </Button>
            <Button onClick={HandlerClose} type={'reset'} variant={'secondary'}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
