import { formDataToJSON } from '@/common/utils/formDataToJSON'
import { baseApi } from '@/services/base-api'

import { Card, CardsResponse, GetCardsArgs, MinMaxResponse } from './cards.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<Card, { args: FormData; id: string }>({
        invalidatesTags: ['Cards', 'Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const state = getState()

          const invalidateBy = cardsService.util.selectInvalidatedBy(state, [{ type: 'Cards' }])

          try {
            const { data } = await queryFulfilled

            invalidateBy.forEach(({ originalArgs }) => {
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  if (originalArgs !== 1) {
                    return
                  }
                  draft.items.unshift(data)
                  draft.items.pop()
                })
              )
            })
          } catch (e) {
            console.log(e)
          }
        },
        query: ({ args, id }) => ({
          body: args,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      deleteCard: builder.mutation<unknown, string>({
        invalidatesTags: ['Cards', 'Decks'],
        async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
          const state = getState()
          const patchResults: any[] = []

          const invalidateBy = cardsService.util.selectInvalidatedBy(state, [{ type: 'Cards' }])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(card => card.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  draft.items.splice(itemToUpdateIndex, 1)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch {
            patchResults.forEach(patchResults => patchResults.undo())
          }
        },
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
        async onQueryStarted({ args, id }, { dispatch, getState, queryFulfilled }) {
          const state = getState()

          const formatedArgs = formDataToJSON(args) // Преобразуем FormData в JSON объект

          const patchResults: any[] = []

          const invalidateBy = cardsService.util.selectInvalidatedBy(state, [{ type: 'Cards' }])

          invalidateBy.forEach(({ originalArgs }) => {
            patchResults.push(
              dispatch(
                cardsService.util.updateQueryData('getCards', originalArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(card => card.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }
                  Object.assign(draft.items[itemToUpdateIndex], formatedArgs)
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch {
            patchResults.forEach(patchResults => patchResults.undo())
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
