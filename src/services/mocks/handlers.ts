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
const moDecks = {
  items: [
    {
      author: {
        id: 'f2be95b9-4d07-4751-a775-bd612fc9553a',
        name: 'WHooosss',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-05-01T13:19:45.629Z',
      id: 'clvnugna504p8nx01smetiuy6',
      isPrivate: false,
      name: 'This',
      updated: '2024-05-01T13:19:48.945Z',
      userId: 'f2be95b9-4d07-4751-a775-bd612fc9553a',
    },
    {
      author: {
        id: '30b1fbfe-70dc-409d-bbf6-86548fd1653e',
        name: 'WHooosss2',
      },
      cardsCount: 0,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/03ac23c1-6b27-4aa9-88c3-4236a40432bf_artworks-000620165332-m9zwot-t500x500.jpg',
      created: '2024-05-01T10:08:03.523Z',
      id: 'clvnnm47704ldnx012lustega',
      isPrivate: false,
      name: 'Is',
      updated: '2024-05-01T10:08:03.523Z',
      userId: '30b1fbfe-70dc-409d-bbf6-86548fd1653e',
    },
    {
      author: {
        id: '0edc7696-8fc1-4961-a087-f9bfed88185c',
        name: 'WHooosss3',
      },
      cardsCount: 1,
      cover: null,
      created: '2024-05-01T09:50:14.103Z',
      id: 'clvnmz71304kmnx017k5rlp2q',
      isPrivate: false,
      name: 'Mock',
      updated: '2024-05-01T09:50:14.103Z',
      userId: '0edc7696-8fc1-4961-a087-f9bfed88185c',
    },
    {
      author: {
        id: 'd033e7f1-8433-47c9-96ef-d7580757363c',
        name: 'Kirill',
      },
      cardsCount: 2,
      cover: null,
      created: '2024-04-30T19:31:09.027Z',
      id: 'clvmsaelf04e9nx01lq0c0bug',
      isPrivate: false,
      name: 'Data',
      updated: '2024-04-30T19:31:09.027Z',
      userId: 'd033e7f1-8433-47c9-96ef-d7580757363c',
    },
    {
      author: {
        id: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
        name: 'WHooosss5',
      },
      cardsCount: 0,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/99aa6ea1-623c-4b9e-8dee-607cd7aad052_songexploder_logo_2023.png',
      created: '2024-04-20T18:49:04.745Z',
      id: 'clv8gds6g000co401khpqe5nk',
      isPrivate: false,
      name: 'By',
      updated: '2024-04-30T12:06:45.468Z',
      userId: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
    },
    {
      author: {
        id: 'acf721cd-9d90-44a1-870a-f03c884080c3',
        name: 'WHooosss6',
      },
      cardsCount: 8,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/a538a460-01f9-4622-926e-7d121d8bba46_calculatorsAuto.png',
      created: '2024-02-07T20:53:46.667Z',
      id: 'clsc9oyln07ewrr2ucukw8cj0',
      isPrivate: false,
      name: 'Kirill',
      updated: '2024-04-29T16:49:43.369Z',
      userId: 'acf721cd-9d90-44a1-870a-f03c884080c3',
    },
    {
      author: {
        id: '687150ff-bca2-4046-8d7a-750370e48361',
        name: 'WHooosss7',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-04-28T22:47:17.971Z',
      id: 'clvk4ey8j03ycnx01264fuxwo',
      isPrivate: false,
      name: 'MockName7',
      updated: '2024-04-28T22:47:17.971Z',
      userId: '687150ff-bca2-4046-8d7a-750370e48361',
    },
    {
      author: {
        id: 'acf721cd-9d90-44a1-870a-f03c884080c3',
        name: 'WHooosss8',
      },
      cardsCount: 0,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/44bfab7a-f937-42fe-bcff-673f55b4ba2f_blob',
      created: '2024-04-28T17:34:47.907Z',
      id: 'clvjt92lf03tqnx01qtbv5mlc',
      isPrivate: false,
      name: 'MockName8',
      updated: '2024-04-28T17:34:47.907Z',
      userId: 'acf721cd-9d90-44a1-870a-f03c884080c3',
    },
    {
      author: {
        id: 'acf721cd-9d90-44a1-870a-f03c884080c3',
        name: 'WHooosss9',
      },
      cardsCount: 0,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/d37a5b4a-7656-451a-ad88-f426564f4b36_blob',
      created: '2024-04-28T16:53:28.746Z',
      id: 'clvjrrxnu03tanx01xc0248gh',
      isPrivate: false,
      name: 'MockName9',
      updated: '2024-04-28T16:53:28.746Z',
      userId: 'acf721cd-9d90-44a1-870a-f03c884080c3',
    },
    {
      author: {
        id: '95b4b44c-3f2d-4bcc-8fbd-2377e397a648',
        name: 'WHooosss10',
      },
      cardsCount: 14,
      cover: null,
      created: '2024-04-27T20:30:29.623Z',
      id: 'clvik35yv03gznx0190mj47n0',
      isPrivate: false,
      name: 'MockName10',
      updated: '2024-04-27T20:30:29.623Z',
      userId: '95b4b44c-3f2d-4bcc-8fbd-2377e397a648',
    },
  ],
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 373,
    totalPages: 38,
  },
}

/** Перехват запросов на сервер для всего приложения!!!*/
const baseUrl = 'https://api.flashcards.andrii.es'
const token = new Date().toISOString()

/** Auth */
export const handlers = [
  http.post(`${baseUrl}/v1/auth/me`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.patch(`${baseUrl}/v1/auth/me`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/login`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/sign-up`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/verify-email`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/logout`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/recover-password`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/reset-password/${token}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.post(`${baseUrl}/v1/auth/resend-verification-email`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),

  /** Cards */
  http.get(`${baseUrl}/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.patch(`${baseUrl}/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  http.delete(`${baseUrl}/v1/cards/{id}`, () => {
    return HttpResponse.json(mokDataLogin, { status: 200 })
  }),
  /** Decks */
  http.get(`${baseUrl}/v2/decks`, () => {
    return HttpResponse.json(moDecks, { status: 200 })
  }),
]
