/** Общие типы */
import { ReactNode } from 'react'

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

export type TabsType = {
  className?: string
  content?: ReactNode
  title?: string
  value?: string
}
