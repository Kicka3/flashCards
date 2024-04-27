import { HttpResponse, http } from 'msw'

/**Request Body for Login */
const mokDataLogin = {
  accessToken: 'qwertyMOK1',
  mokMessage: 'is logg in: true',
  refreshToken: 'qwertyMOK2',
  userIslogged: {
    email: 'testing@gmail.com',
    password: 'qwerty1234',
  },
}

/** Перехват запросов на сервер для всего приложения!!!*/
export const handlers = [
  /** Auth */
  http.post('https://api.flashcards.andrii.es/v1/auth/me', () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.patch('https://api.flashcards.andrii.es/v1/auth/me', () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post('https://api.flashcards.andrii.es/v1/auth/login', () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`https://api.flashcards.andrii.es/v1/auth/sign-up`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`https://api.flashcards.andrii.es/v1/auth/verify-email`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`https://api.flashcards.andrii.es/v1/auth/logout`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  /** Decks */
  http.get(`https://api.flashcards.andrii.es/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.patch(`https://api.flashcards.andrii.es/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.delete(`https://api.flashcards.andrii.es/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
]
