/** Общие типы */

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type PaginationResponse<T> = {
  items: T
  pagination: Pagination
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

/** Не работает */
export type Column = {
  key: string
  ownerValidate: boolean
  sortable?: boolean
  title: string
}
// В файле common.types.ts
export type SortDirection = 'asc' | 'desc'
