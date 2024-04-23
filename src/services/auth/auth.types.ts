export type User = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type LoginRequest = {
  email: string
  password: string
  rememberMe: boolean
}
