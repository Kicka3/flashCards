import { useState } from 'react'
import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useMeQuery } from '@/services/auth'
import { useDeleteCardMutation, useGetCardsQuery } from '@/services/cards'
import { useGetDeckByIdQuery } from '@/services/decks'

type Props = {
  currentPage: number
  deckId: string
  itemsPerPage: string
  setCurrentPage: (page: number) => void
}

export const useCards = ({ currentPage, deckId, itemsPerPage, setCurrentPage }: Props) => {
  const { data: me } = useMeQuery()
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
  const totalItems = cards?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / 10 > 1

  const { data: deck } = useGetDeckByIdQuery(deckId)
  const [deleteCard] = useDeleteCardMutation()

  const onDeleteCard = async (id: string) => {
    try {
      await toast.promise(deleteCard(id).unwrap(), {
        pending: 'In progress',
        success: 'Deck was deleted',
      })
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? "Couldn't Delete")
    }
  }

  const isOwner = deck?.userId === me?.id
  const isEmpty = !deck?.cardsCount

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

  return {
    cards: cards?.items,
    cardsIsLoading,
    deck,
    isEmpty,
    isOwner,
    moreThanOnePage,
    onChangeOrderBy,
    onDeleteCard,
    orderBy,
    searchField,
    setSearchField,
    totalItems,
  }
}
