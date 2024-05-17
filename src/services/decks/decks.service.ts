import { baseApi } from '@/services/base-api'
import {
  Deck,
  DeckBodyRequest,
  DeleteDeckReq,
  GetDecksArgs,
  GetDecksResponse,
  OptimisticDeck,
} from '@/services/decks/decks.types'

import { Card } from '../cards'

/** конвертирую в FormData */
const deckFormDataHandler = (data: DeckBodyRequest) => {
  const formData = new FormData()

  if (data.cover instanceof File) {
    formData.append('cover', data.cover)
  } else if (data.cover === null) {
    formData.append('cover', '')
  }
  formData.append('name', data.name)
  formData.append('isPrivate', String(data.isPrivate))

  return formData
}

export const decksApiService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, DeckBodyRequest>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          let patchResult: any

          try {
            const { data } = await queryFulfilled

            for (const { endpointName, originalArgs } of decksApiService.util.selectInvalidatedBy(
              getState(),
              [{ type: 'Decks' }]
            )) {
              if (endpointName !== 'getDecks') {
                continue
              }
              patchResult = dispatch(
                decksApiService.util.updateQueryData(endpointName, originalArgs, draft => {
                  draft.items.unshift(data)
                  draft.items.pop()
                })
              )
            }
          } catch {
            patchResult.undo()
          }
        },
        query: args => ({
          body: deckFormDataHandler(args),
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckReq>({
        invalidatesTags: ['Decks'],
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          let patchResult: any

          for (const { endpointName, originalArgs } of decksApiService.util.selectInvalidatedBy(
            getState(),
            [{ type: 'Decks' }]
          )) {
            if (endpointName !== 'getDecks') {
              continue
            }
            patchResult = dispatch(
              decksApiService.util.updateQueryData(endpointName, originalArgs, draft => {
                const index = draft.items.findIndex(deck => deck.id === id)

                if (index > -1) {
                  draft.items.splice(index, 1)
                }
              })
            )
          }
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDeckById: builder.query<Deck, string>({
        providesTags: ['Decks'],
        query: id => ({
          url: `v1/decks/${id}`,
        }),
      }),
      getDeckToLearn: builder.query<Card, { id: string }>({
        providesTags: ['Decks', 'Cards'],
        query: ({ id }) => ({
          url: `v1/decks/${id}/learn`,
        }),
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks', 'Cards'],
        query: args => ({
          params: args ?? undefined,
          url: 'v2/decks',
        }),
      }),
      saveGrade: builder.mutation<Card, { args: { cardId: string; grade: number }; id: string }>({
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const card = await queryFulfilled

          dispatch(
            decksApiService.util.updateQueryData(
              'getDeckToLearn',
              { id: card.data.deckId },
              draft => {
                Object.assign(draft, card.data)
              }
            )
          )
        },
        query: ({ args, id }) => ({
          body: args,
          method: 'POST',
          url: `v1/decks/${id}/learn`,
        }),
      }),

      updateDecks: builder.mutation<Deck, { data: DeckBodyRequest; id: string }>({
        invalidatesTags: ['Decks', 'Cards'],
        async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
          const queryArgs = decksApiService.util.selectCachedArgsForQuery(getState(), 'getDecks')

          const updateResult = dispatch(
            decksApiService.util.updateQueryData('getDecks', queryArgs[0], draft => {
              const { cover, isPrivate, name } = args.data
              const index = draft?.items?.findIndex(deck => deck.id === args.id)

              const updated: Partial<OptimisticDeck> = {}

              updated.isPrivate = isPrivate
              updated.name = name
              if (cover instanceof File) {
                updated.cover = URL.createObjectURL(cover)
              }

              if (index !== undefined && index !== -1) {
                draft.items[index] = { ...draft.items[index], ...updated }
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            updateResult.undo
          }
        },
        query: args => ({
          body: deckFormDataHandler(args.data),
          method: 'PATCH',
          url: `v1/decks/${args.id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckToLearnQuery,
  useGetDecksQuery,
  useSaveGradeMutation,
  useUpdateDecksMutation,
} = decksApiService
