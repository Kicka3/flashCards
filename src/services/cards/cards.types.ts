export type CardsResponse = {
  items: Card[]
  pagination: Pagination
}

export type Card = {
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

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type GetCardsArgs = {
  answer?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: null | string
  question?: string
}

export type CreateCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type MinMaxResponse = {
  max: number
  min: number
}
