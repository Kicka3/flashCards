import { baseApi } from '@/services/base-api'

import { Card, CardsResponse, GetCardsArgs, MinMaxResponse } from './cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<void, { args: FormData; id: string }>({
        invalidatesTags: ['Cards', 'Decks'],
        query: ({ args, id }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      deleteCard: builder.mutation<unknown, string>({
        invalidatesTags: ['Cards', 'Decks'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      getCard: builder.query<Card, string>({
        providesTags: ['Cards'],
        query: id => ({
          url: `/v1/cards/${id}`,
        }),
      }),
      getCards: builder.query<CardsResponse, { id: string; params: GetCardsArgs | void }>({
        providesTags: ['Cards'],
        query: ({ id, params }) => ({
          params: params ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxResponse, void>({
        providesTags: ['Cards'],
        query: () => ({
          url: `/v2/decks/min-max-cards`,
        }),
      }),
      updateCard: builder.mutation<void, { args: FormData; id: string }>({
        invalidatesTags: ['Cards'],
        async onQueryStarted({ id, ...patch }, { dispatch, getState, queryFulfilled }) {
          const state = getState()
          /* any так как не типизируется */
          const patchResults: any = []

          cardsService.util
            .selectInvalidatedBy(state, [{ type: 'Cards' }])
            .forEach(({ endpointName, originalArgs }) => {
              if (endpointName !== 'getCards') {
                return
              }
              dispatch(
                cardsService.util.updateQueryData(endpointName, originalArgs, draft => {
                  const itemToUpdate = draft.items.find(card => card.id === id)

                  if (!itemToUpdate) {
                    return
                  }
                  Object.assign(itemToUpdate, patch)
                })
              )
            })

          try {
            await queryFulfilled
          } catch {
            patchResults.forEach((patch: any) => patch.undo())
          }
        },
        query: ({ args, id }) => ({
          body: args,
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardQuery,
  useGetCardsQuery,
  useGetMinMaxCardsQuery,
  useUpdateCardMutation,
} = cardsService
