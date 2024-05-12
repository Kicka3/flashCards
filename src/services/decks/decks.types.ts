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

/** Get Min-Max cards of deck */
export type MinMaxCardsOfDeck = {
  max: number
  min: number
}

/** Delete deck */
export type DeleteDeck = Omit<Deck, 'author'>

//Володя сказал удалить и сделать на {id: string}
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

// /** Get (Retrieve) A Random Card */
// export type GetRandomCard = {
//   answer: string
//   answerImg: string
//   answerVideo: string
//   created: string
//   deckId: string
//   grade: number
//   id: string
//   question: string
//   questionImg: string
//   questionVideo: string
//   shots: number
//   updated: string
//   userId: string
// }
//
// /** Save The Grade (Rating) Of A Card */
// export type SaveRatingCard = {
//   answer: string
//   answerImg: string
//   answerVideo: string
//   created: string
//   deckId: string
//   grade: number
//   id: string
//   question: string
//   questionImg: string
//   questionVideo: string
//   shots: number
//   updated: string
//   userId: string
// }
