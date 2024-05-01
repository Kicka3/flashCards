import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'

import s from '@/pages/decks/decks.module.scss'

type DeckHeaderProps = {
  isLoading: boolean
  onClick?: () => void
}

export const DeckHeader = ({}: DeckHeaderProps) => {
  /** Tabs Вынести в отдельный файл?? */
  const tabs = [
    { title: 'My Cards', value: 'My Cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  /** Value-state для Slider */
  type SliderType = number[]
  const [value, setValue] = useState<SliderType>([1, 20])

  const [search, setSearch] = useState<string>('')
  // const { data, isLoading } = useGetDecksQuery({
  //   name: search,
  // })
  //
  // if (isLoading) {
  //   return (
  //     <h1 style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
  //       LOADING...
  //     </h1>
  //   )
  // }

  return (
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
  )
}
