import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Deck } from '@/services/decks'
import { IconDropDown } from '@/widgets/header/ui/icon-dropdown/iconDropdown'

import s from './packIntro.module.scss'

type Props = {
  deck: Deck | undefined
  isEmpty: boolean
  isOwner: boolean
  setIsOpenCreate: (isOpen: boolean) => void
}

export const PackIntro = ({ deck, isEmpty, isOwner, setIsOpenCreate }: Props) => {
  if (!isEmpty) {
    return (
      <>
        <div className={s.packIntro}>
          <div className={s.packTitleWrapper}>
            <div className={s.packTitle}>
              <Typography variant={'h1'}>{deck?.name}</Typography>
            </div>
            {deck?.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
          </div>
        </div>
        <div className={s.noCardWrapper}>
          {isOwner ? (
            <>
              <Typography className={s.noCardInfo} variant={'body2'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
              <Button onClick={() => setIsOpenCreate(true)}>Add New Card</Button>
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
          {isOwner && <IconDropDown />}
        </div>
        {deck?.cover && <img alt={'Deck`s cover'} height={100} src={deck.cover} width={150} />}
      </div>
      {isOwner ? (
        <Button onClick={() => setIsOpenCreate(true)}>Add New Card</Button>
      ) : (
        <Button onClick={() => {}}>Start to Learn</Button>
      )}
    </div>
  )
}
