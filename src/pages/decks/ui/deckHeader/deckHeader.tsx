import { TrashOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'
import { Typography } from '@/common/ui/typography'
import { CreateDeck } from '@/features/deck/createDeck/createDeck'
import { useGetMinMaxCardsQuery } from '@/services/cards'
import { TabsType } from '@/services/common.types'

import s from './deckHeader.module.scss'

type Props = {
  clearFilter: () => void
  currentTab: string
  deckIsFetching: boolean
  isLoading?: boolean
  maxCards: number
  minCards: number
  onChangeSearchField: (searchField: string) => void
  onCommitSliderValues: (minMaxCounts: number[]) => void
  onTabValueChange: (tabValue: string) => void
  searchField: string
  tabs: TabsType[]
}

export const DeckHeader = ({
  clearFilter,
  currentTab,
  deckIsFetching,
  maxCards,
  minCards,
  onChangeSearchField,
  onCommitSliderValues,
  onTabValueChange,
  searchField,
  tabs,
}: Props) => {
  const { data: minMaxValues } = useGetMinMaxCardsQuery()

  const onClearFilters = () => {
    clearFilter()
  }

  return (
    <>
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks list</Typography>
        <CreateDeck
          trigger={
            <Button as={'div'} variant={'primary'}>
              Add New Deck
            </Button>
          }
        />
      </div>
      <div className={s.deckFilterWrapper}>
        <div>
          <TextField
            onChange={onChangeSearchField}
            placeholder={'Search deck'}
            value={searchField}
            variant={'search'}
          />
        </div>

        <div className={s.deckFilterGroup}>
          <div>
            <Tabs
              disabled={deckIsFetching}
              label={'Show decks cards'}
              onTabValueChange={onTabValueChange}
              tabs={tabs}
              value={currentTab || tabs[0].value}
            />
          </div>
          <Slider
            defaultValue={[minCards, maxCards]}
            max={minMaxValues?.max}
            min={minMaxValues?.min}
            onValueCommit={onCommitSliderValues}
          />
          <Button onClick={onClearFilters} variant={'secondary'}>
            <TrashOutline height={'16px'} width={'16px'} />
            Clear Filter
          </Button>
        </div>
      </div>
    </>
  )
}
