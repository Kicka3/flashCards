import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'
import { CreateDeck } from '@/features/deck/createDeck/createDeck'
import { TabsType } from '@/pages/decks/decksContainer'

import s from './deckHeader.module.scss'

/** UI компонента */

type Props = {
  isLoading?: boolean
  onClick?: () => void
  search: string
  setSearch: (value: string) => void
  setValue: (newValue: number[]) => void
  tabs: TabsType[]
  value: number[]
}

export const DeckHeader = ({ search, setSearch, setValue, tabs, value }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const HandlerCreateDeck = () => {
    setIsOpenModal(true)
  }

  return (
    <>
      <CreateDeck isOpen={isOpenModal} onOpenChange={setIsOpenModal} title={'Add New Deck'} />
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks list</Typography>
        <Button onClick={HandlerCreateDeck} type={'button'}>
          Add new deck
        </Button>
      </div>
      <div className={s.deckFilterWrapper}>
        <div>
          <TextField
            onChange={setSearch}
            placeholder={'Search deck'}
            value={search}
            variant={'search'}
          />
        </div>

        <div className={s.deckFilterGroup}>
          <div>
            <Tabs defaultValue={tabs[1].value} label={'Show decks cards'} tabs={tabs} />
          </div>
          <Slider
            max={32}
            min={0}
            minStepsBetweenThumbs={1}
            onValueChange={newValue => {
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
    </>
  )
}