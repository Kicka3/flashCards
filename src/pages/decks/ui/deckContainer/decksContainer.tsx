import { useNavigate } from 'react-router-dom'

import { useFilter } from '@/common/hooks/useFilter'
import { Pagination } from '@/common/ui/pagination'
import { Typography } from '@/common/ui/typography'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { DeckHeader } from '@/pages/decks/ui/deckHeader'
import { DecksTable } from '@/pages/decks/ui/deckTable/decksTable'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'
import { Loader } from '@/widgets/loader'

import s from './decks.module.scss'

type Props = {
  /** Для storybook */
  isLoading?: boolean
  onClick?: () => void
}

export const DecksContainer = ({}: Props) => {
  const {
    currentPage,
    deckData,
    deckIsLoading,
    isOwner,
    itemsPerPage,
    mappedDecks,
    orderBy,
    setCurrentPage,
    setSortedBy,
  } = useDeckFilter()
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
      <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Loader />
      </h1>
    )
  }

  /** Удаляю Deck */
  const onDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  /** Открываю Deck */
  const openDeck = (deckId: string) => {
    navigate(`/decks/${deckId}`)
  }

  /** Пагинация */
  const totalItems = deckData?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / Number(itemsPerPage) > 1

  return (
    <>
      <DeckHeader tabs={tabs} />
      {mappedDecks?.length ? (
        <DecksTable
          decks={mappedDecks}
          isDeckBeingDeleted={isDeckBeingDeleted}
          isOwner={isOwner}
          onDeleteClick={onDeleteDeck}
          onSort={setSortedBy}
          openDeck={openDeck}
          sort={orderBy}
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
