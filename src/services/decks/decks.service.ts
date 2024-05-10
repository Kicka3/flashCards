import { baseApi } from '@/services/base-api'
import {
  DeckBodyRequest,
  DeleteDeckReq,
  GetDecksArgs,
  GetDecksResponse,
} from '@/services/decks/decks.types'

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
      createDeck: builder.mutation<void, DeckBodyRequest>({
        invalidatesTags: ['Decks'],
        // async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        //   const res = await queryFulfilled
        //
        //   const args = decksService.util.selectCachedArgsForQuery(getState(), 'getDecks')
        //
        //   dispatch(
        //     decksService.util.updateQueryData('getDecks', args[0], draft => {
        //       draft.items.pop()
        //       draft.items.unshift(res.data)
        //     })
        //   )
        // },
        query: args => ({
          //Конверитрую датаформ и отправляю
          body: deckFormDataHandler(args),
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckReq>({
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: 'v2/decks',
        }),
      }),
      updateDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: `v1/decks/{id}`,
        }),
      }),
    }
  },
})

export const { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } = decksApiService
