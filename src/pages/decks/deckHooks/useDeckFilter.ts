import { usePageFilter } from '@/common/hooks/usePageFilter'
import { useGetMinMaxCardsQuery } from '@/services/cards'
import { useGetDecksQuery } from '@/services/decks/decks.service'

export const useDeckFilter = () => {
  const {
    changeSearchHandler,
    currentPage,
    debounceName,
    itemsPerPage,
    me,
    onChangeCurrentPage,
    onChangeName,
    orderBy,
    search,
    searchBy,
    setItemsPerPage,
    setSearch,
    setSortedBy,
    sortedString,
  } = usePageFilter()

  /** Запрос для слайдера?? */
  const { data: minMaxValues } = useGetMinMaxCardsQuery()

  /** Листаем контент табами */
  const onTabValueChange = (value: string) => {
    changeSearchHandler('currentTab', value)
  }

  /** Получаем корректный Tab */
  const getCurrentTab = search.get('currentTab') || 'allCards'

  /** Для слайдера в deck/header */
  const onCommitSliderValues = (value: number[]) => {
    changeSearchHandler('minCardsCount', value[0].toString())
    changeSearchHandler('maxCardsCount', value[1].toString())
  }
  const minCards = Number(search.get('minCardsCount') || 0)
  const maxCards = Number(search.get('maxCardsCount') || 15)

  /** Чистим search */
  const clearFilter = () => {
    setSearch({})
  }

  const {
    data: deckData,
    isFetching: deckIsFetching,
    isLoading: deckIsLoading,
  } = useGetDecksQuery({
    authorId: getCurrentTab === 'userCards' ? me?.id : undefined,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: debounceName,
    orderBy: sortedString,
  })
  /** Приводим разные типы к одному ВЫНЕС В ХУК
   * Мапиться тут или лучше в DECKS???!**/
  const mappedDecks = deckData?.items.map(deck => ({
    cards: deck.cardsCount,
    createdBy: deck.author.name,
    id: deck.id,
    lastUpdated: deck.updated,
    name: deck.name,
  }))

  return {
    clearFilter,
    currentPage,
    deckData,
    deckIsFetching,
    deckIsLoading,
    getCurrentTab,
    itemsPerPage,
    mappedDecks,
    maxCards,
    me,
    minCards,
    minMaxValues,
    onChangeCurrentPage,
    onChangeName,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    searchBy,
    setItemsPerPage,
    setSortedBy,
  }
}
