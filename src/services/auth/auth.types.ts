export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserData = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type SingUpArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}

export type UpdateUserDataArgs = {
  avatar: FormData
  name: FormData
}

export type ResendVerificationEmailArgs = {
  html: string
  subject: string
  userId: string
}
export type RecoverPassword = {
  email: string
  html: string
  subject: string
}
