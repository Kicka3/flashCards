import { Link } from 'react-router-dom'

import { GoBackButton } from '@/common/ui/backButton'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { Deck } from '@/services/decks'
import { IconDropDown } from '@/widgets/icon-dropdown'

import s from './cardsHeader.module.scss'

type Props = {
  deck: Deck
  isEmpty: boolean
  isOwner: boolean
}

export const CardsHeader = ({ deck, isEmpty, isOwner }: Props) => {
  return (
    <>
      <GoBackButton className={s.backBtn} />

      <div className={s.packIntro}>
        <div className={s.packTitleWrapper}>
          <div className={s.packTitle}>
            <Typography variant={'h1'}>{deck.name}</Typography>
            {isOwner && <IconDropDown deck={deck} />}
          </div>
          {deck.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
        </div>

        {!isEmpty && (
          <>
            {isOwner ? (
              <div>
                <CreateCard
                  deckId={deck.id}
                  title={'Add New Card'}
                  trigger={<Button as={'div'}>Add New Card</Button>}
                />
              </div>
            ) : (
              <div>
                <Button as={Link} to={'learn'}>
                  Start to Learn
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
