import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ROUTES } from '@/common/enums/enums'
import { useAppOutletContext } from '@/common/hooks/useOutletContext'
import { Loader } from '@/common/ui/loader'
import Layout from '@/layout/layout'
import { CheckEmail } from '@/pages/auth/checkEmail'
import { CreateNewPasswordContainer } from '@/pages/auth/createNewPassword/createNewPasswordContainer'
import { ForgotPassword } from '@/pages/auth/forgotPasword'
import { ProfilePage } from '@/pages/auth/profile'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/singUp'
import { DecksContainer } from '@/pages/decks/ui/deckContainer'
import { LearnCards } from '@/pages/learnCards'
import { PageNotFound } from '@/pages/pageNotFound'
import { Cards } from '@/pages/сards'

const publicRoutes: RouteObject[] = [
  {
    element: <ForgotPassword />,
    path: ROUTES.FORGOT_PASSWORD,
  },
  {
    element: <SignIn />,
    path: ROUTES.SIGN_IN,
  },
  {
    element: <SignUp />,
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

function PrivateRoutes() {
  const { isAuth, isLoading } = useAppOutletContext()

  if (isLoading) {
    return <Loader />
  }

  return isAuth ? <Outlet /> : <Navigate to={ROUTES.SIGN_IN} />
}

function PublicRoutes() {
  const { isAuth, isLoading } = useAppOutletContext()

  if (isLoading) {
    return <Loader />
  }

  return isAuth ? <Navigate to={ROUTES.DECKS} /> : <Outlet />
}

const router = createBrowserRouter([
  {
    children: [
      { children: publicRoutes, element: <PublicRoutes /> },
      { children: privateRoutes, element: <PrivateRoutes /> },
    ],
    element: <Layout />,
    errorElement: <PageNotFound />,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
