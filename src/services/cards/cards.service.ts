import { baseApi } from '@/services/base-api'

import { CardsResponse, CreateCardArgs, GetCardsArgs } from './cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<void, { args: CreateCardArgs; id: string }>({
        query: ({ args, id }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      deleteCard: builder.mutation<unknown, string>({
        query: id => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<CardsResponse, { id: string; params: GetCardsArgs | void }>({
        query: ({ id, params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
    }
  },
})

export const { useCreateCardMutation, useDeleteCardMutation, useGetCardsQuery } = cardsService
