import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchField = searchParams.get('searchField') || ''
  const orderBy = searchParams.get('orderBy') || 'null'
  const currentPage = Number(searchParams.get('page')) || 1
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10

  const debouncedSearch = useDebounce(searchField)

  const onChangeOrderBy = (columnName: string) => {
    let newOrder = 'asc'

    if (orderBy === `${columnName}-asc`) {
      newOrder = 'desc'
    }
    if (orderBy === `${columnName}-desc`) {
      searchParams.delete('orderBy')
    } else {
      searchParams.set('orderBy', `${columnName}-${newOrder}`)
    }
    searchParams.set('page', '1')

    setSearchParams(searchParams)
  }

  const onChangeSearchField = (searchField: string) => {
    if (!searchField) {
      searchParams.delete('searchField')
    } else {
      searchParams.set('searchField', searchField)
    }
    searchParams.set('page', '1')

    setSearchParams(searchParams)
  }

  const onChangePage = (page: number) => {
    searchParams.set('page', page.toString())

    setSearchParams(searchParams)
  }

  const onChangeItemsPerPage = (count: string) => {
    searchParams.set('itemsPerPage', count)
    searchParams.set('page', '1')

    setSearchParams(searchParams)
  }

  // decks
  const currentTab = searchParams.get('currentTab') || 'allCards'

  const minCards = Number(searchParams.get('minCardsCount') || 0)
  const maxCards = Number(searchParams.get('maxCardsCount') || 15)

  /** Обработчик применения значений слайдера для фильтрации колод по количеству карт. */
  const onCommitSliderValues = (minMaxCounts: number[]) => {
    searchParams.set('minCardsCount', minMaxCounts[0].toString())
    searchParams.set('maxCardsCount', minMaxCounts[1].toString())
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  /** Очищаем фильтры. */
  const clearFilter = () => {
    setSearchParams({})
  }

  // Обработчик изменения текущей вкладки.
  const onTabValueChange = (tabValue: string) => {
    searchParams.set('currentTab', tabValue)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  return {
    clearFilter,
    currentPage,
    currentTab,
    debouncedSearch,
    itemsPerPage,
    maxCards,
    minCards,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangePage,
    onChangeSearchField,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    searchField,
  }
}
