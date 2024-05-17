import { Link } from 'react-router-dom'

import { PlayCircleOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { Deck } from '@/services/decks'
import { IconDropDown } from '@/widgets/header/ui/icon-dropdown/iconDropdown'

import s from './packIntro.module.scss'

type Props = {
  deck: Deck | undefined
  isEmpty: boolean
  isOwner: boolean
}

const CardCreator = (deckId: string) => (
  <CreateCard
    deckId={deckId}
    title={'Add New Card'}
    trigger={<Button as={'div'}>Add New Card</Button>}
  />
)

export const PackIntro = ({ deck, isEmpty, isOwner }: Props) => {
  if (!isEmpty) {
    return (
      <>
        <div className={s.packIntro}>
          <div className={s.packTitleWrapper}>
            <div className={s.packTitle}>
              <Typography variant={'h1'}>{deck?.name}</Typography>
            </div>
            {deck?.cover && <img alt={'Deck`s cover'} className={s.deckCover} src={deck.cover} />}
          </div>
        </div>
        <div className={s.noCardWrapper}>
          {isOwner ? (
            <>
              <Typography className={s.noCardInfo} variant={'body2'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
              {deck && CardCreator(deck?.id)}
            </>
          ) : (
            <Typography className={s.noCardInfo} variant={'body2'}>
              No content in this pack...
            </Typography>
          )}
        </div>
      </>
    )
  }

  return (
    <div className={s.packIntro}>
      <div className={s.packTitleWrapper}>
        <div className={s.packTitle}>
          <Typography variant={'h1'}>{deck?.name}</Typography>
          {isOwner ? (
            <IconDropDown />
          ) : (
            <Button as={Link} to={'learn'} variant={'icon'}>
              <PlayCircleOutline height={'16px'} width={'16px'} />
            </Button>
          )}
        </div>
        {deck?.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
      </div>
      {isOwner ? deck && CardCreator(deck?.id) : <Button onClick={() => {}}>Start to Learn</Button>}
    </div>
  )
}
