import { useMemo, useState } from 'react'

import { Sort } from '@/services/common.types'
import { MyDeck } from '@/services/decks'

/**
 * Хук для сортировки колод.
 * @param decks - Массив колод для сортировки.
 * @param sort - Текущий критерий сортировки.
 * @param onSort - Функция для обновления состояния сортировки.
 * @returns Объект с функциями для обработки сортировки и отсортированный массив колод.
 */
export const useSortDecks = (
  decks: MyDeck[],
  sort: Sort | undefined,
  onSort: ((sort: Sort | null) => void) | undefined // Изменен тип onSort для обработки null
) => {
  // Состояние для отслеживания количества кликов.
  const [clickCount, setClickCount] = useState(0)

  /**
   * Обработчик для сортировки колод по нажатию на заголовок таблицы.
   * @param columnName - Название колонки, по которой будет выполнена сортировка.
   */
  const handleSort = (columnName: string) => {
    if (!onSort) {
      return
    }

    // Вычисляем новый критерий сортировки в зависимости от текущего состояния.
    const newSort: Sort | null =
      clickCount < 2
        ? {
            direction: sort?.key === columnName && sort.direction === 'asc' ? 'desc' : 'asc',
            key: columnName,
          }
        : null

    // Обновляем состояние сортировки.
    onSort(newSort)
    // Увеличиваем счетчик кликов.
    setClickCount(clickCount => clickCount + 1)

    // Если кликов стало больше или равно 2, сбрасываем счетчик кликов.
    if (clickCount >= 2) {
      setClickCount(0)
    }
  }

  /**
   * Отсортированный массив колод.
   * Используется useMemo для мемоизации, чтобы не выполнять сортировку при каждом рендере,
   * если колоды или критерий сортировки не изменились.
   */
  const sortedDecks = useMemo(() => {
    if (!decks || !sort) {
      return decks
    }

    // Массив допустимых ключей для сортировки Указаны не верно. Тестовый вариант.
    // const validSortKeys: Array<keyof MyDeck> = [
    //   'cards',
    //   'cover',
    //   'created',
    //   'createdBy',
    //   'id',
    //   'lastUpdated',
    //   'name',
    //   'isPrivate',
    //   'userId',
    // ]
    //
    // // Проверяем, что ключ сортировки является допустимым для MyDeck.
    // if (!validSortKeys.includes(sort.key as keyof MyDeck)) {
    //   console.error(`Недопустимый ключ сортировки: ${sort.key}`)
    //
    //   return decks
    // }

    // Получаем ключ для сортировки.
    const key = sort.key as keyof MyDeck

    // Возвращаем отсортированный массив колод.
    return [...decks].sort((a, b) => {
      if (a[key] < b[key]) {
        return sort.direction === 'asc' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return sort.direction === 'asc' ? 1 : -1
      }

      return 0
    })
  }, [decks, sort])

  // Возвращаем функцию для обработки сортировки и отсортированный массив колод.
  return { handleSort, sortedDecks }
}
