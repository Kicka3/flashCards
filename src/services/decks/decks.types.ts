import { Pagination, PaginationResponse } from '@/services/common.types'

export type GetDecksResponse = PaginationResponse<Deck[]>

/** Deck Author */
export type DeckAuthor = {
  id: string
  name: string
}

/** Create Deck Request */
export type CreateDeckRequest = {
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

/** Paginated Deck */
export type Items = {
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
  items: Items[]
  pagination: Pagination
}

/** Get Min-Max cards of deck */
export type MinMaxCardsOfDeck = {
  max: number
  min: number
}

/** Get (Retrieve) deck by id */
export type GetDeckById = {
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

/** Update deck */
export type UpdateDeck = {
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

/** Delete deck */
export type DeleteDeck = {
  cardsCount: number
  cover: string
  created: string
  id: string
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

/** Get (Retrieve) cards in a deck */
export type GetCardsInDeck = {
  items: Items[]
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

/** Get (Retrieve) A Random Card */
export type GetRandomCard = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

/** Save The Grade (Rating) Of A Card */
export type SaveRatingCard = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

//-------------------

/** Deck */
export type Deck = {
  cardsCount: number
  cover: null | string
  /** Format: date-time */
  created: string
  id: string
  isPrivate: boolean
  name: string
  /** Format: date-time */
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
export type DeckBody = {
  cover: File | null | string
  isPrivate: boolean
  name: string
}
