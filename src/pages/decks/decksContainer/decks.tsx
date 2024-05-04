import { useState } from 'react'

import { DeckHeader } from '@/pages/decks/deckHeader'
import { DecksTable } from '@/pages/decks/decks-table/decksTable'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'

/** Контейнерная компонента для логики DECKS */

export type TabsType = {
  title: string
  value: string
}
type SliderType = number[]

type Props = {
  /** Для storybook */
  isLoading?: boolean
  onClick?: () => void
}

export const Decks = ({}: Props) => {
  /** Tabs Вынести в отдельный файл для констант?? */
  const tabs = [
    { title: 'My Cards', value: 'My Cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  /** Стейт для поиска */
  const [search, setSearch] = useState<string>('')

  /** Value-state для Slider */
  const [value, setValue] = useState<SliderType>([1, 20])

  const { data, isFetching, isLoading } = useGetDecksQuery({
    name: search,
  })

  /** DELETE */
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (isLoading) {
    return (
      <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        LOADING...
      </h1>
    )
  }

  const mappedData = data?.items.map(deck => ({
    cards: deck.cardsCount,
    createdBy: deck.author.name,
    id: deck.id,
    lastUpdated: deck.updated,
    name: deck.name,
  }))

  // const isOwner = () => {
  //Являюсь ли я создателем колоды?
  // return true
  // }
  const onDeleteDeck = (id: string) => {
    deleteDeck({ id })
  }

  return (
    <>
      <DeckHeader
        search={search}
        setSearch={setSearch}
        setValue={setValue}
        tabs={tabs}
        value={value}
      />
      <DecksTable decks={mappedData} isOwner onDeleteClick={onDeleteDeck} />
      {/*<Pagination*/}
      {/*//From server*/}
      {/*  currentPage={}*/}
      {/*  itemsPerPage={}*/}
      {/*  onChangeItemsPerPage={}*/}
      {/*  onChangePage={}*/}
      {/*//From server*/}
      {/*  totalCount={}*/}
      {/*/>*/}
    </>
  )
}
