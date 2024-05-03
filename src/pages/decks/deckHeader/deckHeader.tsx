import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Slider } from '@/common/ui/slider'
import { Tabs } from '@/common/ui/tabs'
import { TextField } from '@/common/ui/textField'
import { CreateDeck } from '@/features/deck/createDeck/createDeck'

import s from './deckHeader.module.scss'

/** Тупая UI компонента */

type Props = {
  isLoading?: boolean
  onClick?: () => void
  search: string
  setSearch: (value: string) => void
}

export const DeckHeader = ({ search, setSearch }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  /** Tabs Вынести в отдельный файл?? */
  const tabs = [
    { title: 'My Cards', value: 'My Cards' },
    { title: 'All Cards', value: 'All Cards' },
  ]

  /** Value-state для Slider */
  type SliderType = number[]
  const [value, setValue] = useState<SliderType>([1, 20])
  /** Вынести из этого файла */
  // const [search, setSearch] = useState<string>('')

  const HandlerCreateDeck = () => {
    setIsOpenModal(true)
    console.log('createDeck')
  }

  return (
    <>
      <CreateDeck isOpen={isOpenModal} onOpenChange={setIsOpenModal} title={'Add New Deck'} />
      {/*<div>*/}
      <div className={s.deckHead}>
        <Typography variant={'h1'}>Decks list</Typography>
        <Button onClick={HandlerCreateDeck} type={'button'}>
          Add new deck
        </Button>
      </div>
      <div className={s.deckFilterWrapper}>
        <div className={s.decksSearch}>
          <TextField
            onChange={setSearch}
            placeholder={'Search deck'}
            value={search}
            variant={'search'}
          />
        </div>

        <div className={s.deckFilterGroup}>
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
      {/*</div>*/}
    </>
  )
}
