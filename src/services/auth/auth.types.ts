export type LoginRequest = {
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
export type SingUpRequest = {
  email: string
  html: string
  name: string
  password: string
  sendConfirmationEmail: boolean
  subject: string
}
