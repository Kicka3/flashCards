export enum ROUTES {
  CARDS = '/decks/:id',
  CHECK_EMAIL = '/checkEmail',
  CREATE_NEW_PASSWORD_TOKEN = '/createNewPassword/:token',
  DECKS = '/decks',
  FORGOT_PASSWORD = '/forgotPassword',
  LEARN_CARDS = '/decks/:id/learn',
  PROFILE = '/profile',
  SIGN_IN = '/signIn',
  SIGN_UP = '/signUp',
}

//Сделать функции на каждый путь где динамически подменяем ID и вызвать их в to={вызов}

//В Deck form вместо Deck передать в пропсы DefaultValue (Просто переименовать)
