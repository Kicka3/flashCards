import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { paginationOptions } from '@/common/constants'
import { useSearch } from '@/common/hooks/useSearch'
import { useMeQuery } from '@/services/auth'
import { useDeleteCardMutation, useGetCardsQuery } from '@/services/cards'
import { useGetDeckByIdQuery } from '@/services/decks'

type Props = {
  deckId: string
}

export const useCards = ({ deckId }: Props) => {
  const { data: me } = useMeQuery()

  const { data: deck } = useGetDeckByIdQuery(deckId)
  const isOwner = deck?.userId === me?.id
  const isEmpty = !deck?.cardsCount

  const {
    currentPage,
    debouncedSearch,
    itemsPerPage,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangePage,
    onChangeSearchField,
    orderBy,
    searchField,
  } = useSearch()

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
  const moreThanOnePage = totalItems / Number(paginationOptions[0]) > 1

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

  return {
    cards: cards?.items,
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
  }
}
