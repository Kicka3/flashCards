import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks/useDebounce'
import { useMeQuery } from '@/services/auth'
import { Sort } from '@/services/common.types'

export const usePageFilter = () => {
  const [search, setSearch] = useSearchParams({})

  const { data: me } = useMeQuery()

  /** Настройки для фильтрации */
  const orderBy = JSON.parse(search.get('orderBy') || '""')

  /** Для поиска */
  const searchBy = search.get('name') || ''

  /** Сортировка по строкам */
  const sortedString = useMemo(() => {
    if (!orderBy) {
      return null
    }

    return `${orderBy.key}-${orderBy.direction}`
  }, [orderBy])
  //Тут вылетает ошибка с сервера

  const setSortedBy = (value: Sort) => {
    if (!value || value.key) {
      changeSearchHandler('orderBy', JSON.stringify(value))
    }
  }
  // const setSortedBy = (value: Sort | null) => {
  //   if (!value) {
  //     changeSearchHandler('orderBy', 'null') // Если сортировка сбрасывается
  //   } else {
  //     changeSearchHandler('orderBy', `${value.key}-${value.direction}`) // Если сортируется по определенному полю
  //   }
  // }

  /** Функция для поисков */
  const changeSearchHandler = (field: string, params: string) => {
    if (!params) {
      search.delete(field)
    } else {
      search.set(field, params)
    }
    search.set('page', '1')
    setSearch(search, { replace: true })
  }

  /** Для пагинации */
  const setItemsPerPage = (value: number) => {
    changeSearchHandler('itemsPerPage', value.toString())
  }

  const itemsPerPage = Number(search.get('itemsPerPage') || '10')

  const onChangeCurrentPage = (value: number) => {
    changeSearchHandler('currentPage', value.toString())
  }
  const currentPage = Number(search.get('currentPage') || 1)

  /** Задержка для поиска */
  const debounceName = useDebounce(searchBy, 700)

  const onChangeName = (value: string) => {
    changeSearchHandler('name', value)
  }

  return {
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
  }
}
