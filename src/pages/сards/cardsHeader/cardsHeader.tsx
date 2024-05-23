import { useState } from 'react'
import { ErrorResponse, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { GoBackButton } from '@/common/ui/backButton'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { Deck, useDeleteDeckMutation } from '@/services/decks'
import { IconDropDown } from '@/widgets/icon-dropdown/iconDropdown'

import s from './cardsHeader.module.scss'

type Props = {
  deck: Deck
  isEmpty: boolean
  isOwner: boolean
}

export const CardsHeader = ({ deck, isEmpty, isOwner }: Props) => {
  const [isOpenUpdModal, setIsOpenUpdModal] = useState(false)

  /** ИЗ КОМПОНЕНТЫ DECKTABLE кортеж для формы удаления. */
  const [deleteForm, setDeleteForm] = useState<[boolean, string | undefined]>([false, undefined])

  /**DELETE DECK */
  const [deleteDeck] = useDeleteDeckMutation()

  const navigate = useNavigate()

  const onEditClickHandler = () => {
    setIsOpenUpdModal(true)
  }

  const onOpenDeleteFormHandler = () => {
    setDeleteForm([true, deck.name])
  }

  const goBackHandler = () => {
    navigate(-1)
  }

  /** Вынести выше в Cards? */
  const onDeleteDeck = async (id: string) => {
    if (!deck || !deck.id) {
      toast.error('Deck is not defined or its id is missing')

      return
    }

    try {
      if (id) {
        await toast.promise(deleteDeck({ id: deck.id }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
        goBackHandler()
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? "Deck Couldn't Delete")
    }
  }

  /** Закрываю DELETE FORM*/
  const closeDeleteFormHandler = () => {
    setDeleteForm([false, undefined])
  }

  return (
    <>
      <GoBackButton className={s.backBtn} />

      <div className={s.packIntro}>
        <UpdateDeck
          deck={deck}
          isOpen={isOpenUpdModal}
          onOpenChange={setIsOpenUpdModal}
          title={'Update Deck'}
        />
        <DeleteForm
          close={closeDeleteFormHandler}
          deleteAction={deckId => {
            onDeleteDeck(deckId)
          }}
          id={deck.id}
          isDeck
          isOpen={deleteForm[0]}
          name={deck.name}
          onOpenChange={setDeleteForm}
          title={'Delete Pack'}
        />
        <div className={s.packTitleWrapper}>
          <div className={s.packTitle}>
            <Typography variant={'h1'}>{deck.name}</Typography>
            {isOwner && (
              <IconDropDown
                isEmpty
                onEditClick={onEditClickHandler}
                onOpenDeleteForm={onOpenDeleteFormHandler}
              />
            )}
          </div>
          {deck.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
        </div>

        {!isEmpty && (
          <>
            {isOwner ? (
              <div>
                <CreateCard
                  deckId={deck.id}
                  title={'Add New Card'}
                  trigger={<Button as={'div'}>Add New Card</Button>}
                />
              </div>
            ) : (
              <div>
                <Button as={Link} to={'learn'}>
                  Start to Learn
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
