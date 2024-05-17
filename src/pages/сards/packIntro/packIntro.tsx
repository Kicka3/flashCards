import { useState } from 'react'
import { ErrorResponse, Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { PlayCircleOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { Deck, useDeleteDeckMutation, useGetDeckByIdQuery } from '@/services/decks'
import { IconDropDown } from '@/widgets/icon-dropdown/iconDropdown'

import s from './packIntro.module.scss'

type Props = {
  deck: Deck | undefined
  isEmpty: boolean
  isOwner: boolean
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
  //ИЗ КОМПОНЕНТЫ DECKTABLE
  const [deleteForm, setDeleteForm] = useState<[boolean, string | undefined]>([false, undefined])

  /**DELETE DECK */
  const [deleteDeck] = useDeleteDeckMutation()

  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const { findDeck } = useDeckFilter()

  const { data: deckId } = useGetDeckByIdQuery(id!)

  // const { me } = useFilter()
  // const { isEmpty } = useCardFilter(id)
  // const isOwner = me?.id === deckId?.userId
  // const isEmpty = deckId?.cardsCount === 0

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
    console.log('set is open true')
    setOpenEditMode(true)
  }

  const onOpenDeleteFormHandler = () => {
    console.log('set is open delete form true')
    setDeleteForm([true, 'Тут должно быть имя Deck'])
  }

  const learnDeckHandler = () => {
    navigate(`/cards/${id}/learn`)
  }

  const goBackHandler = () => {
    navigate(-1)
  }

  const onDeleteDeck = async (id: string) => {
    try {
      if (id) {
        await toast.promise(deleteDeck(deckId).unwrap(), {
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

  //Закрываю DELETE FORM из комопненты DECKSTABLE
  const closeDeleteFormHandler = () => {
    setDeleteForm([false, undefined])
  }

  return (
    <div className={s.packIntro}>
      <UpdateDeck
        deck={findDeck(deckId)}
        isOpen={openEditMode}
        onOpenChange={setOpenEditMode}
        title={'Update Deck'}
      />
      <DeleteForm
        close={closeDeleteFormHandler}
        deleteAction={deckId => {
          onDeleteDeck(deckId)
        }}
        id={id}
        isDeck
        //Тут в deleteDeck кортеж
        isOpen={deleteForm[0]}
        //Передать имя?!?
        name={deleteForm[1]}
        onOpenChange={setDeleteForm}
        title={'Delete Pack'}
      />
      <div className={s.packTitleWrapper}>
        <div className={s.packTitle}>
          <Typography variant={'h1'}>{deck?.name}</Typography>
          {isOwner ? (
            <IconDropDown
              isEmpty
              learn={learnDeckHandler}
              onEditClick={onEditClickHandler}
              onOpenDeleteForm={onOpenDeleteFormHandler}
            />
          ) : (
            <Button as={Link} to={'learn'} variant={'icon'}>
              <PlayCircleOutline height={'16px'} width={'16px'} />
            </Button>
          )}
        </div>
        {deck?.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
      </div>
      {isOwner ? (
        deck && CardCreator(deck?.id)
      ) : (
        <Button
          onClick={() => {
            console.log('ДЩЧ')
          }}
        >
          Start to Learn
        </Button>
      )}
    </div>
  )
}
