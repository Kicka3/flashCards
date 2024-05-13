import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFilter } from '@/common/hooks/useFilter'
import { Pagination, Typography } from '@/common/ui'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { DeckHeader } from '@/pages/decks/ui/deckHeader'
import { DecksTable } from '@/pages/decks/ui/deckTable/decksTable'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

import s from './decks.module.scss'

type SliderType = number[]

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
    maxCards,
    minCards,
    minMaxValues,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    searchBy,
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

  /** Value-state для Slider */
  const [value, setValue] = useState<SliderType>([1, 20])

  /** DELETE */
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (deckIsLoading) {
    return (
      <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        LOADING...
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
      <DeckHeader
        maxCards={maxCards}
        minCards={minCards}
        minMaxValues={minMaxValues}
        onCommitSliderValues={onCommitSliderValues}
        onTabValueChange={onTabValueChange}
        search={searchBy}
        setSearch={onChangeName}
        setValue={setValue}
        tabs={tabs}
        value={value}
      />
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
