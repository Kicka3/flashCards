import { useState } from 'react'

import { Typography } from '@/common/ui'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { DeckHeader } from '@/pages/decks/ui/deckHeader'
import { DecksTable } from '@/pages/decks/ui/deckTable/decksTable'
import { useDeleteDeckMutation } from '@/services/decks/decks.service'

import s from './decks.module.scss'

/** Контейнерная компонента для логики DECKS */

type SliderType = number[]

type Props = {
  /** Для storybook */
  isLoading?: boolean
  onClick?: () => void
}

export const DecksContainer = ({}: Props) => {
  const { deckIsLoading, isOwner, mappedDecks, orderBy, setSortedBy } = useDeckFilter()

  /** Tabs Вынести в отдельный файл для констант?? */
  const tabs = [
    { title: 'My Cards', value: 'My Cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  /** Value-state для Slider */
  const [value, setValue] = useState<SliderType>([1, 20])

  /** DELETE */
  const [deleteDeck] = useDeleteDeckMutation()

  if (deckIsLoading) {
    return (
      <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        LOADING...
      </h1>
    )
  }
  const onDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  return (
    <div className={s.deckContainer}>
      <DeckHeader setValue={setValue} tabs={tabs} value={value} />
      {mappedDecks?.length ? (
        <DecksTable
          decks={mappedDecks}
          isOwner={isOwner}
          onDeleteClick={onDeleteDeck}
          onSort={setSortedBy}
          sort={orderBy}
        />
      ) : (
        <Typography variant={'sub1'}>Content is not found...</Typography>
      )}
      {/*     <Pagination*/}
      {/*//From server*/}
      {/*  currentPage={}*/}
      {/*  itemsPerPage={}*/}
      {/*  onChangeItemsPerPage={}*/}
      {/*  onChangePage={}*/}
      {/*//From server*/}
      {/*  totalCount={}*/}
      {/*/>*/}
    </div>
  )
}
