import { useCallback } from 'react'

import { useFilter } from '@/common/hooks/useFilter'
import { useGetMinMaxCardsQuery } from '@/services/cards'
import { useGetDecksQuery } from '@/services/decks/decks.service'

export const useDeckFilter = () => {
  /** Используем хук useFilter для управления фильтрацией и пагинацией. */
  const {
    changeSearchHandler,
    currentPage,
    debounceName,
    itemsPerPage,
    me,
    onChangeName,
    orderBy,
    search,
    searchBy,
    setCurrentPage,
    setSearch,
    setSortedBy,
    sortedString,
  } = useFilter()

  /** Запрашиваем минимальное и максимальное количество карт для слайдера. */
  const { data: minMaxValues } = useGetMinMaxCardsQuery()

  // Обработчик изменения текущей вкладки.
  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

  /** Получаем текущую вкладку из поискового запроса. */
  const getCurrentTab = search.get('currentTab') || 'allCards'

  /** Обработчик применения значений слайдера для фильтрации колод по количеству карт. */
  const onCommitSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }

  /** Получаем минимальное и максимальное значения для фильтрации колод. */
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  /** Очищаем фильтры. */
  const clearFilter = () => {
    setSearch({})
  }

  /** Запрашиваем колоды с использованием параметров фильтрации. */
  const {
    data: deckData,
    isFetching: deckIsFetching,
    isLoading: deckIsLoading,
  } = useGetDecksQuery({
    authorId: getCurrentTab === 'userCards' ? me?.id : undefined,
    currentPage: currentPage,
    itemsPerPage: Number(itemsPerPage),
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: debounceName,
    orderBy: sortedString,
  })

  /** Преобразуем полученные данные в удобный формат. */
  const mappedDecks = deckData?.items.map(deck => ({
    cards: deck.cardsCount,
    cover: deck.cover,
    created: deck.created,
    createdBy: deck.author.name,
    id: deck.id,
    isPrivate: deck.isPrivate,
    lastUpdated: deck.updated,
    name: deck.name,
    userId: deck.userId,
  }))

  /** Проверяем, является ли текущий пользователь владельцем колоды. */
  const isOwner = (userId: string) => {
    return userId === me?.id
  }

  /** Ищу нужную колоду */
  const findDeck = useCallback(
    (id: string) => {
      return mappedDecks?.find(d => d.id === id)
    },
    [mappedDecks]
  )

  /** Возвращаем объект с данными и функциями для управления фильтрацией колод. */
  return {
    clearFilter,
    currentPage,
    deckData,
    deckIsFetching,
    deckIsLoading,
    findDeck,
    getCurrentTab,
    isOwner,
    itemsPerPage,
    mappedDecks,
    maxCards,
    me,
    minCards,
    minMaxValues,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    search,
    searchBy,
    setCurrentPage,
    setSortedBy,
  }
}
