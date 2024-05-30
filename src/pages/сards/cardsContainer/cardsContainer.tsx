import { useParams } from 'react-router-dom'

import { Button } from '@/common/ui/button'
import { Loader } from '@/common/ui/loader'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { Cards } from '@/pages/сards/cards'
import { CardsHeader } from '@/pages/сards/cardsHeader/cardsHeader'
import { useCards } from '@/pages/сards/cardsHooks/useCards'

import s from './cardsContainer.module.scss'

export const CardsContainer = () => {
  const { id } = useParams()
  const deckId = id || ''

  const {
    cards,
    cardsIsLoading,
    currentPage,
    deck,
    isEmpty,
    isOwner,
    itemsPerPage,
    moreThanOnePage,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangePage,
    onChangeSearchField,
    onDeleteCard,
    orderBy,
    paginationOptions,
    searchField,
    totalItems,
  } = useCards({ deckId })

  if (cardsIsLoading) {
    return (
      <h1 className={s.loaderWrapper}>
        <Loader />
      </h1>
    )
  }

  if (!deck) {
    return <div>Deck is not fount</div>
  }

  return (
    <section className={s.wrapper}>
      <CardsHeader deck={deck} isEmpty={isEmpty} isOwner={isOwner} />

      {isEmpty ? (
        <div className={s.noCardWrapper}>
          {isOwner ? (
            <>
              <Typography className={s.noCardInfo} variant={'body2'}>
                This pack is empty. Click add new card to fill this pack
              </Typography>
              <CreateCard
                deckId={deckId}
                title={'Add New Card'}
                trigger={<Button as={'div'}>Add New Card</Button>}
              />
            </>
          ) : (
            <Typography className={s.noCardInfo} variant={'body2'}>
              No content in this pack...
            </Typography>
          )}
        </div>
      ) : (
        <Cards
          cards={cards!}
          currentPage={currentPage}
          isOwner={isOwner}
          itemsPerPage={itemsPerPage}
          moreThanOnePage={moreThanOnePage}
          onChangeItemsPerPage={onChangeItemsPerPage}
          onChangeOrderBy={onChangeOrderBy}
          onChangePage={onChangePage}
          onChangeSearchField={onChangeSearchField}
          onDeleteCard={onDeleteCard}
          orderBy={orderBy}
          paginationOptions={paginationOptions}
          searchField={searchField}
          totalItems={totalItems}
        />
      )}
    </section>
  )
}
