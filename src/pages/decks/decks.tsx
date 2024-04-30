import { DecksTable } from '@/pages/decks/decks-table/decksTable'
import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const { data, isLoading } = useGetDecksQuery()

  console.log(data)

  if (isLoading) {
    return <h1>LOADING...</h1>
  }

  const mappedData = data?.items.map(deck => ({
    cards: deck.cardsCount,
    createdBy: deck.created,
    id: deck.id,
    lastUpdated: deck.updated,
    name: deck.name,
  }))

  return (
    <div>
      <DecksTable decks={mappedData} />
    </div>
  )
}
