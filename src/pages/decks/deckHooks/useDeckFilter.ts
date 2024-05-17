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
    setItemsPerPage,
    setSearch,
    setSortedBy,
    sortedString,
  } = useFilter()

  /** Slider Запрашиваем минимальное и максимальное количество карт для слайдера. */
  const { data: minMaxValues } = useGetMinMaxCardsQuery()

  /** Обработчик применения значений слайдера для фильтрации колод по количеству карт. */
  const onCommitSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }

  /** Получаем минимальное и максимальное значения для фильтрации колод. */
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  /** Tabs-слайдер */

  /** Получаем текущую вкладку из поискового запроса. */
  const getCurrentTab = search.get('currentTab') || 'allCards'

  // Обработчик изменения текущей вкладки.
  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

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
    currentPage,
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
    (id: string | undefined) => {
      return mappedDecks?.find(d => d.id === id)
    },
    [mappedDecks]
  )

  //!!!!!!!!!!!Уже есть в USEFILTER
  const paginationOptions = ['10', '20', '30', '50', '100']

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
    minCards,
    minMaxValues,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    paginationOptions,
    search,
    searchBy,
    setCurrentPage,
    setItemsPerPage,
    setSortedBy,
  }
}
