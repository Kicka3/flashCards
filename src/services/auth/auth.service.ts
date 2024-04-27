import { LoginRequest, UserData } from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<void, LoginRequest>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      me: builder.query<UserData, void>({
        query: () => ({
          method: 'GET',
          url: 'v1/auth/me',
        }),
      }),
    }
  },
})

export const { useLoginMutation, useMeQuery } = authService
