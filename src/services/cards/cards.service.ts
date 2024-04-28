import { baseApi } from '@/services/base-api'

import { CardsResponse, GetCardsArgs } from './cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      // deleteCard: builder.mutation<unknown, { id: string }>({
      //   query: id => ({
      //     method: 'DELETE',
      //     url: `/v1/cards/${id}`,
      //   }),
      // }),
      getCards: builder.query<CardsResponse, { id: string; params: GetCardsArgs | void }>({
        query: ({ id, params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      // updateCard: builder.mutation<void, Pick<CardsResponse, 'id'> & Partial<CardsResponse>>({
      //   query: ({ id, ...patch }) => ({
      //     body: patch,
      //     method: 'PATCH',
      //     url: `/v1/cards/${id}`,
      //   }),
      // }),
    }
  },
})

export const { useGetCardsQuery } = cardsService
