import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchField = searchParams.get('searchField') || ''
  const orderBy = searchParams.get('orderBy') || null
  const currentPage = Number(searchParams.get('page')) || 1
  const itemsPerPage = Number(searchParams.get('itemsPerPage')) || 10

  const debouncedSearch = useDebounce(searchField)

  const onChangeOrderBy = (columnName: string) => {
    let newOrder = 'asc'

    if (orderBy === `${columnName}-asc`) {
      newOrder = 'desc'
    }

    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      if (orderBy === `${columnName}-desc`) {
        params.delete('orderBy')
      } else {
        params.set('orderBy', `${columnName}-${newOrder}`)
      }
      params.set('page', '1')

      return params
    })
  }

  const onChangeSearchField = (searchField: string) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      if (!searchField) {
        params.delete('searchField')
      } else {
        params.set('searchField', searchField)
      }
      params.set('page', '1')

      return params
    })
  }

  const onChangePage = (page: number) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      params.set('page', page.toString())

      return params
    })
  }

  const onChangeItemsPerPage = (count: string) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      params.set('itemsPerPage', count)
      params.set('page', '1')

      return params
    })
  }

  // decks
  const currentTab = searchParams.get('currentTab') || 'allCards'

  const minCards = Number(searchParams.get('minCardsCount') || 0)
  const maxCards = Number(searchParams.get('maxCardsCount') || 15)

  /** Обработчик применения значений слайдера для фильтрации колод по количеству карт. */
  const onCommitSliderValues = (minMaxCounts: number[]) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      params.set('minCardsCount', minMaxCounts[0].toString())
      params.set('maxCardsCount', minMaxCounts[1].toString())

      return params
    })
  }

  /** Очищаем фильтры. */
  const clearFilter = () => {
    setSearchParams({})
  }

  // Обработчик изменения текущей вкладки.
  const onTabValueChange = (tabValue: string) => {
    setSearchParams(prevParams => {
      const params = new URLSearchParams(prevParams)

      params.set('currentTab', tabValue)
      params.set('page', '1')

      return params
    })
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
