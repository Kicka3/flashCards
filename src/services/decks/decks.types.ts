import { Pagination, PaginationResponse } from '@/services/common.types'

export type GetDecksResponse = PaginationResponse<Deck[]>

/** Deck Author */
export type DeckAuthor = {
  id: string
  name: string
}

/** Мои форматированные типы */
export type MyDeck = {
  cards: number
  cover: string
  created: string
  createdBy: string
  id: string
  isPrivate: boolean
  lastUpdated: string
  name: string
  userId: string
}

/** Deck From server*/
export type Deck = {
  author: DeckAuthor
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type PaginatedDeckList = {
  items: Deck[]
  pagination: Pagination
}

/** Delete deck */
export type DeleteDeck = Omit<Deck, 'author'>

export type DeleteDeckReq = {
  id: string
}

/** Get (Retrieve) cards in a deck */
export type GetCardsInDeck = {
  items: Deck[]
  pagination: Pagination
}

/** Create Card In A Deck */
export type CreateCardInDeck = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

/** Get Deck Args */
export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

/** Deck Body */
export type DeckBodyRequest = {
  cover: File | null | string
  isPrivate: boolean
  name: string
}
