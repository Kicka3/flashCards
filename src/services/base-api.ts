import { baseQueryWithReauth } from '@/services/baseApiWithReAuth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Me', 'Decks', 'Cards'],
})
