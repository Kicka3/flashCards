import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/enums/enums'
import { useAppOutletContext } from '@/common/hooks/useOutletContext'
import { Error } from '@/common/ui/toast/toast.stories'
import { Layout } from '@/layout/layout'
import { CheckEmail } from '@/pages/auth/checkEmail'
import { CreateNewPasswordContainer } from '@/pages/auth/createNewPassword/createNewPasswordContainer'
import { ForgotPasswordContainer } from '@/pages/auth/forgotPasword/forgotPasswordContainer'
import { ProfilePage } from '@/pages/auth/profile'
import { SignInContainer } from '@/pages/auth/signIn/signInContainer'
import { SignUpContainer } from '@/pages/auth/singUp/signUpContainer'
import { DecksContainer } from '@/pages/decks/ui/deckContainer'
import { LearnCards } from '@/pages/learnCards'
import { Cards } from '@/pages/сards'

const publicRoutes: RouteObject[] = [
  {
    element: <ForgotPasswordContainer />,
    path: ROUTES.FORGOT_PASSWORD,
  },
  {
    element: <SignInContainer />,
    path: ROUTES.SIGN_IN,
  },
  {
    element: <SignUpContainer />,
    path: ROUTES.SIGN_UP,
  },
  /* поправить email */
  {
    element: <CheckEmail email={'mail@mail.com'} />,
    path: ROUTES.CHECK_EMAIL,
  },
  {
    element: <CreateNewPasswordContainer />,
    path: ROUTES.CREATE_NEW_PASSWORD_TOKEN,
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={ROUTES.DECKS} />,
        path: '/',
      },
      {
        element: <Cards />,
        path: ROUTES.CARDS,
      },
      {
        element: <DecksContainer />,
        path: ROUTES.DECKS,
      },
      { element: <ProfilePage />, path: ROUTES.PROFILE },
      { element: <LearnCards />, path: ROUTES.LEARN_CARDS },
    ],
  },
]

const PrivateRoutes = () => {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />
}

const PublicRoutes = () => {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Navigate to={ROUTES.DECKS} /> : <Outlet />
}

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
    errorElement: <Error />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
