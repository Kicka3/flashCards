import { ErrorResponse, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums/enums'
import { useFilter } from '@/common/hooks/useFilter'
import { Loader } from '@/common/ui/loader/loader'
import { Pagination } from '@/common/ui/pagination'
import { Typography } from '@/common/ui/typography'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { DeckHeader } from '@/pages/decks/ui/deckHeader'
import { DecksTable } from '@/pages/decks/ui/deckTable/decksTable'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

import s from './decks.module.scss'

type Props = {
  /** Types for storybook */
  isLoading?: boolean
  onClick?: () => void
}

export const DecksContainer = ({}: Props) => {
  const { currentPage, deckData, deckIsLoading, itemsPerPage, mappedDecks, setCurrentPage } =
    useDeckFilter()
  const { paginationOptions, setItemsPerPage } = useFilter()

  const navigate = useNavigate()

  /** Tabs Вынести в отдельный файл для констант?? */
  const tabs = [
    { title: 'My Cards', value: 'userCards' },
    { title: 'All Cards', value: 'allCards' },
  ]

  /** DELETE */
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (deckIsLoading) {
    return (
      <h1 className={s.loaderWrapper}>
        <Loader />
      </h1>
    )
  }

  /** Delete Deck */
  const onDeleteDeck = async (id: string) => {
    try {
      await toast.promise(deleteDeck({ id }).unwrap(), {
        pending: 'In progress',
        success: 'Deck was deleted',
      })
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? "Couldn't Delete")
    }
  }

  /** Open Deck */
  const openDeck = (deckId: string) => {
    navigate(`/decks/${deckId}`)
  }

  /** learn Deck забавная реализация */
  const learnDeckHandler = (deckId: string) => {
    navigate(ROUTES.LEARN_CARDS.replace(':id', deckId))
  }

  /** Pagination */
  const totalItems = deckData?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / Number(itemsPerPage) > 1

  return (
    <>
      <DeckHeader tabs={tabs} />
      {mappedDecks?.length ? (
        <DecksTable
          decks={mappedDecks}
          isDeckBeingDeleted={isDeckBeingDeleted}
          learnDeck={learnDeckHandler}
          onDeleteClick={onDeleteDeck}
          openDeck={openDeck}
        />
      ) : (
        <Typography variant={'sub1'}>Content is not found...</Typography>
      )}
      {moreThanOnePage && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          defaultValue={paginationOptions[0]}
          itemsPerPage={Number(itemsPerPage)}
          onChangeItemsPerPage={setItemsPerPage}
          onChangePage={setCurrentPage}
          options={paginationOptions}
          totalCount={totalItems || 0}
        />
      )}
    </>
  )
}
