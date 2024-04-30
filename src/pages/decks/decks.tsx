import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const { data, isLoading } = useGetDecksQuery()

  console.log(data)

  if (isLoading) {
    return <h1>LOADING...</h1>
  }

  return <div>{JSON.stringify(data)}</div>
}
