import {
  LoginArgs,
  RecoverPassword,
  ResendVerificationEmailArgs,
  SingUpArgs,
  UserData,
} from '@/services/auth/auth.types'
import { baseApi } from '@/services/base-api'

const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createRefreshToken: builder.mutation<void, void>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v2/auth/refresh-token',
        }),
      }),
      login: builder.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['Me'],
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
      me: builder.query<UserData, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: '/v1/auth/me',
        }),
      }),
      recoverPassword: builder.mutation<void, RecoverPassword>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/recover-password',
        }),
      }),
      resendVerificationEmail: builder.mutation<void, ResendVerificationEmailArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/resend-verification-email',
        }),
      }),
      resetPassword: builder.mutation<void, { password: string; token: string }>({
        query: ({ password, token }) => ({
          body: password,
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      signUp: builder.mutation<UserData, SingUpArgs>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
      updateUser: builder.mutation<UserData, FormData>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'PATCH',
          url: '/v1/auth/me',
        }),
      }),
      verifyEmail: builder.mutation<void, { code: string }>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/verify-email',
        }),
      }),
    }
  },
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useVerifyEmailMutation,
} = authService
