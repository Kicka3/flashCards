import { baseApi } from '@/services/base-api'
import {
  DeckBodyRequest,
  DeleteDeckReq,
  GetDecksArgs,
  GetDecksResponse,
} from '@/services/decks/decks.types'

export const decksApiService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<void, DeckBodyRequest>({
        //Инвалидируем теги
        invalidatesTags: ['Decks'],
        query: args => ({
          body: args,
          method: 'POST',
          url: 'v1/decks',
        }),
      }),
      deleteDeck: builder.mutation<void, DeleteDeckReq>({
        //Инвалидируем теги
        invalidatesTags: ['Decks'],
        query: args => ({
          method: 'DELETE',
          url: `v1/decks/${args.id}`,
        }),
      }),
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        //Делаем инвалидацию кеша для обновления состояния
        providesTags: ['Decks'],
        query: args => ({
          params: args ?? undefined,
          url: 'v2/decks',
        }),
      }),
    }
  },
})

export const { useCreateDeckMutation, useDeleteDeckMutation, useGetDecksQuery } = decksApiService
