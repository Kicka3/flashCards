import { LoginRequest } from '@/services/auth/auth.types'
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
    }
  },
})

export const { useLoginMutation } = authService
