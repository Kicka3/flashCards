import { useState } from 'react'

import { TextField } from '@/common/ui/textField'
import { DecksTable } from '@/pages/decks/decks-table/decksTable'
import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const [search, setSearch] = useState<string>('')

  const { data, isLoading } = useGetDecksQuery({
    name: search,
  })

  console.log(data)

  if (isLoading) {
    return <h1>LOADING...</h1>
  }

  const mappedData = data?.items.map(deck => ({
    cards: deck.cardsCount,
    createdBy: deck.author.name,
    id: deck.id,
    lastUpdated: deck.updated,
    name: deck.name,
  }))

  return (
    <div>
      <TextField onChange={setSearch} value={search} variant={'search'} />
      <DecksTable decks={mappedData} />
    </div>
  )
}
