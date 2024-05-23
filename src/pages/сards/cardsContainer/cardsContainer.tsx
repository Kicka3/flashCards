import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useFilter } from '@/common/hooks/useFilter'
import { Button } from '@/common/ui/button'
import { Loader } from '@/common/ui/loader'
import { Typography } from '@/common/ui/typography'
import { CreateCard } from '@/features/cards/createCard'
import { Cards } from '@/pages/сards/cards'
import { CardsHeader } from '@/pages/сards/cardsHeader/cardsHeader'
import { useDeleteCardMutation, useGetCardsQuery } from '@/services/cards'
import { useGetDeckByIdQuery } from '@/services/decks'

import s from './cardsContainer.module.scss'

export const CardsContainer = () => {
  const { id } = useParams()
  const deckId = id || ''
  const { currentPage, itemsPerPage, me, paginationOptions, setCurrentPage, setItemsPerPage } =
    useFilter()

  const [searchField, setSearchField] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const debouncedSearch = useDebounce(searchField)
  const { data: cards, isLoading: cardsIsLoading } = useGetCardsQuery({
    id: deckId,
    params: {
      currentPage,
      itemsPerPage: Number(itemsPerPage),
      orderBy: orderBy,
      question: debouncedSearch,
    },
  })
  const { data: deck } = useGetDeckByIdQuery(deckId)
  const [deleteCard] = useDeleteCardMutation()

  const isOwner = deck?.userId === me?.id
  const isEmpty = !deck?.cardsCount

  const totalItems = cards?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / 10 > 1

  const onChangeOrderBy = (columnName: string) => {
    let newOrder = 'asc'

    if (orderBy === `${columnName}-asc`) {
      newOrder = 'desc'
    }

    setOrderBy(`${columnName}-${newOrder}`)

    if (orderBy === `${columnName}-desc`) {
      setOrderBy('') // сбрасываем сортировку полностью
    }

    if (currentPage !== 1) {
      setCurrentPage(1) // при сортировке сбрасывать на 1 страницу
    }
  }

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
          cards={cards?.items!}
          currentPage={currentPage}
          deleteCard={deleteCard}
          isOwner={isOwner}
          itemsPerPage={itemsPerPage}
          moreThanOnePage={moreThanOnePage}
          onChangeCurrentPage={setCurrentPage}
          onChangeItemsCountPerPage={setItemsPerPage}
          onChangeOrderBy={onChangeOrderBy}
          onChangeSearchField={setSearchField}
          orderBy={orderBy}
          paginationOptions={paginationOptions}
          searchField={searchField}
          totalItems={totalItems}
        />
      )}
    </section>
  )
}
