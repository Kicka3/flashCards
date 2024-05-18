import { useState } from 'react'
import { ErrorResponse, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { PlayCircleOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { Deck, useDeleteDeckMutation } from '@/services/decks'
import { IconDropDown } from '@/widgets/icon-dropdown/iconDropdown'

import s from './packIntro.module.scss'

type Props = {
  deck: Deck | undefined
  isEmpty: boolean
  isOwner: boolean
  learnDeck: (deckId: string) => void
}

const CardCreator = (deckId: string) => (
  <CreateCard
    deckId={deckId}
    title={'Add New Card'}
    trigger={<Button as={'div'}>Add New Card</Button>}
  />
)

export const PackIntro = ({ deck, isEmpty, isOwner }: Props) => {
  const [openEditMode, setOpenEditMode] = useState(false)

  /** ИЗ КОМПОНЕНТЫ DECKTABLE кортеж для формы удаления. */
  const [deleteForm, setDeleteForm] = useState<[boolean, string | undefined]>([false, undefined])

  /**DELETE DECK */
  const [deleteDeck] = useDeleteDeckMutation()

  const navigate = useNavigate()

  const { findDeck } = useDeckFilter()

  if (!isEmpty) {
    return (
      <>
        <div className={s.packIntro}>
          <div className={s.packTitleWrapper}>
            <div className={s.packTitle}>
              <Typography variant={'h1'}>{deck?.name}</Typography>
            </div>
            {deck?.cover && <img alt={'Deck`s cover'} className={s.deckCover} src={deck.cover} />}
          </div>
        </div>
        <div className={s.noCardWrapper}>
          {isOwner ? (
            <>
              <Typography className={s.noCardInfo} variant={'body2'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
              {deck && CardCreator(deck?.id)}
            </>
          ) : (
            <Typography className={s.noCardInfo} variant={'body2'}>
              No content in this pack...
            </Typography>
          )}
        </div>
      </>
    )
  }

  const onEditClickHandler = () => {
    setOpenEditMode(true)
  }

  const onOpenDeleteFormHandler = () => {
    setDeleteForm([true, deck?.name])
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

  /** Закрываю DELETE FORM из комопненты DECKSTABLE */
  const closeDeleteFormHandler = () => {
    setDeleteForm([false, undefined])
  }

  return (
    <div className={s.packIntro}>
      <UpdateDeck
        deck={findDeck(deck?.id)}
        isOpen={openEditMode}
        onOpenChange={setOpenEditMode}
        title={'Update Deck'}
      />
      <DeleteForm
        close={closeDeleteFormHandler}
        deleteAction={deckId => {
          onDeleteDeck(deckId)
        }}
        id={deck?.id}
        isDeck
        isOpen={deleteForm[0]}
        name={deck?.name}
        onOpenChange={setDeleteForm}
        title={'Delete Pack'}
      />
      <div className={s.packTitleWrapper}>
        <div className={s.packTitle}>
          <Typography variant={'h1'}>{deck?.name}</Typography>
          {isOwner && (
            <IconDropDown
              isEmpty
              onEditClick={onEditClickHandler}
              onOpenDeleteForm={onOpenDeleteFormHandler}
            />
          )}
        </div>
        {deck?.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
      </div>
      {isOwner ? (
        deck && CardCreator(deck?.id)
      ) : (
        <div>
          <Button as={Link} to={'learn'}>
            Start to Learn
          </Button>
        </div>
      )}
    </div>
  )
}
