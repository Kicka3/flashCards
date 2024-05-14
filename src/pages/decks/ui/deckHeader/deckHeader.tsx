import { TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'
import { CreateDeck } from '@/features/deck/createDeck/createDeck'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { TabsType } from '@/services/common.types'

import s from './deckHeader.module.scss'

type Props = {
  isLoading?: boolean
  tabs: TabsType[]
}

export const DeckHeader = ({ tabs }: Props) => {
  const {
    clearFilter,
    maxCards,
    minCards,
    minMaxValues,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    search,
  } = useDeckFilter()

  const onClearFilters = () => {
    clearFilter()
  }

  return (
    <>
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks list</Typography>
        <CreateDeck
          title={'Add New Deck'}
          trigger={
            <Button as={'div'} style={{ padding: '12px 30px' }} variant={'primary'}>
              Add new deck
            </Button>
          }
        />
      </div>
      <div className={s.deckFilterWrapper}>
        <div>
          <TextField
            onChange={onChangeName}
            placeholder={'Search deck'}
            value={search.toString()}
            variant={'search'}
          />
        </div>

        <div className={s.deckFilterGroup}>
          <div>
            <Tabs
              defaultValue={tabs[1].value}
              label={'Show decks cards'}
              onTabValueChange={onTabValueChange}
              tabs={tabs}
            />
          </div>
          <Slider
            defaultValue={[minCards, maxCards]}
            max={minMaxValues?.max}
            min={minMaxValues?.min}
            onValueCommit={onCommitSliderValues}
          />
          <Button
            icon={<TrashOutline height={'14px'} width={'14px'} />}
            onClick={onClearFilters}
            variant={'secondary'}
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </>
  )
}
