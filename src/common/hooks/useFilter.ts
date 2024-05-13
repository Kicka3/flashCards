import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useMeQuery } from '@/services/auth'
import { Sort } from '@/services/common.types'

export const useFilter = () => {
  const [search, setSearch] = useSearchParams({})

  const { data: me } = useMeQuery()

  /** Настройки для фильтрации */
  const orderBy = JSON.parse(search.get('orderBy') || '""')

  /** Для поиска */
  const searchBy = search.get('name') || ''

  /** Задержка для поиска */
  const debounceName = useDebounce(searchBy, 700)

  /** Функция для поиска */
  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search, { replace: true })
  }

  /** Сортировка по строкам */
  const sortedString = useMemo(() => {
    if (!orderBy) {
      return null
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])

  const setSortedBy = (value: Sort) => {
    if (!value || value.key) {
      changeSearchHandler('orderBy', JSON.stringify(value))
    }
  }

  /** Изменение имени */
  const onChangeName = (value: string) => {
    changeSearchHandler('name', value)
  }

  /** Пагинация (общее) */
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const paginationOptions = ['10', '20', '30', '50', '100']

  return {
    changeSearchHandler,
    currentPage,
    debounceName,
    itemsPerPage,
    me,
    onChangeName,
    orderBy,
    paginationOptions,
    search,
    searchBy,
    setCurrentPage,
    setItemsPerPage,
    setSearch,
    setSortedBy,
    sortedString,
  }
}
