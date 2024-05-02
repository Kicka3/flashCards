import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'
import { DecksTable } from '@/pages/decks/decks-table/decksTable'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'

import s from './decks.module.scss'

type DecksProps = {
  isLoading: boolean
  onClick?: () => void
}

export const Decks = ({}: DecksProps) => {
  /** Tabs Вынести в отдельный файл?? */
  const tabs = [
    { title: 'My Cards', value: 'My Cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  /** Value-state для Slider */
  type SliderType = number[]
  const [value, setValue] = useState<SliderType>([1, 20])

  const [search, setSearch] = useState<string>('')
  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     isPrivate: undefined,
  //     name: '',
  //   },
  // })

  const { data, isLoading } = useGetDecksQuery({
    name: search,
  })
  // const [createDeck, { isLoading: isDeckBeingCreated }] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

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

  return (
    <>
      <div className={s.decksHeaderWrapper}>
        <div className={s.deckHead}>
          <Typography variant={'h1'}>Decks list</Typography>
          <Button>Add new deck</Button>
        </div>
        <div className={s.filterGroupWrapper}>
          <div className={s.decksSearch}>
            <TextField
              onChange={setSearch}
              placeholder={'Search deck'}
              value={search}
              variant={'search'}
            />
          </div>

          <div className={s.decksTabs}>
            <Tabs label={'Show decks cards'} tabs={tabs} />
          </div>
          <Slider
            max={32}
            min={0}
            minStepsBetweenThumbs={1}
            onValueChange={(newValue: number[]) => {
              setValue(newValue)
            }}
            step={1}
            value={value}
          />
          <Button icon={<TrashOutline height={'14px'} width={'14px'} />} variant={'secondary'}>
            Clear Filter
          </Button>
        </div>
      </div>

      <DecksTable decks={mappedData} onDeleteClick={id => deleteDeck({ id })} />
      {/*<Pagination*/}
      {/*  currentPage={}*/}
      {/*  itemsPerPage={}*/}
      {/*  onChangeItemsPerPage={}*/}
      {/*  onChangePage={}*/}
      {/*  totalCount={}*/}
      {/*/>*/}
    </>
  )
}
{
  /*<form*/
}
{
  /*  onSubmit={handleSubmit(data => {*/
}
{
  /*    createDeck(data as any)*/
}
{
  /*  })}*/
}
{
  /*  style={{ border: '1px solid #ccc', margin: '24px 0', padding: '24px' }}*/
}
{
  /*>*/
}
{
  /*  <ControlledTextField control={control} label={'Name'} name={'name'} />*/
}
{
  /*  <ControlledCheckbox control={control} name={'isPrivate'} text={'Private deck'} />*/
}
{
  /*  <Button disabled={isDeckBeingCreated}>Create Deck</Button>*/
}
{
  /*</form>*/
}
{
  /*<TextField onChange={setSearch} value={search} variant={'search'} />*/
}
