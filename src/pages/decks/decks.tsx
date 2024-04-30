import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/common/ui/button'
import { ControlledCheckbox } from '@/common/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/common/ui/controlled/controlled-textField'
import { TextField } from '@/common/ui/textField'
import { DecksTable } from '@/pages/decks/decks-table/decksTable'
import { useGetDecksQuery } from '@/services/base-api'

export const Decks = () => {
  const [search, setSearch] = useState<string>('')
  const { control, handleSubmit } = useForm({
    defaultValues: {
      isPrivate: undefined,
      name: '',
    },
  })

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
      <form
        onSubmit={handleSubmit(data => {
          console.log(data)
        })}
        style={{ border: '1px solid #ccc', margin: '24px 0', padding: '24px' }}
      >
        <ControlledTextField control={control} label={'Name'} name={'name'} />
        <ControlledCheckbox control={control} name={'isPrivate'} text={'Private deck'} />
        <Button>Create Deck</Button>
      </form>
      <TextField onChange={setSearch} value={search} variant={'search'} />
      <DecksTable decks={mappedData} />
    </div>
  )
}
