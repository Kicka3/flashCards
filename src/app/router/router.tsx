import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAppOutletContext } from '@/common/hooks/useOutletContext'
import { CheckEmail } from '@/pages/auth/checkEmail'
import { CreateNewPassword } from '@/pages/auth/createNewPassword'
import { ForgotPassword } from '@/pages/auth/forgotPasword'
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/singUp'
import PageNotFound from '@/pages/pageNotFound/pageNotFound'
import { Cards } from '@/pages/сards'

import { Decks } from '../../pages/decks/deckContainer'
import Layout from '../layout/layout'

const publicRoutes: RouteObject[] = [
  {
    element: <ForgotPassword />,
    path: Routes.FORGOT_PASSWORD,
  },
  {
    element: <SignIn />,
    path: Routes.SIGN_IN,
  },
  {
    element: <SignUp />,
    path: Routes.SIGN_UP,
  },
  /* поправить email */
  {
    element: <CheckEmail email={'mail@mail.com'} />,
    path: Routes.CHECK_EMAIL,
  },
  {
    element: <CreateNewPassword />,
    path: Routes.CREATE_NEW_PASSWORD,
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={Routes.DECKS} />,
        path: '/',
      },
      {
        element: <Cards />,
        path: Routes.CARDS,
      },
      {
        element: <Decks />,
        path: Routes.DECKS,
      },
      { element: <ProfilePage />, path: Routes.PROFILE },
    ],
  },
]

const router = createBrowserRouter([
  {
    children: [
      { children: privateRoutes, element: <PrivateRoutes /> },
      { children: publicRoutes, element: <PublicRoutes /> },
    ],
    element: <Layout />,
    errorElement: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

// const isAuth = false

function PrivateRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={'/signIn'} />
}

function PublicRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Navigate to={'/decks'} /> : <Outlet />
}
