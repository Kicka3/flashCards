import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Routes } from '@/common/enums/enums'
import { useAppOutletContext } from '@/common/hooks/useOutletContext'
import { CheckEmail } from '@/pages/auth/checkEmail'
import { CreateNewPassword } from '@/pages/auth/createNewPassword'
import { ForgotPassword } from '@/pages/auth/forgotPasword'
import { ProfilePage } from '@/pages/auth/profile'
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

function PrivateRoutes() {
  const { isAuth, isLoading } = useAppOutletContext()

  if (isLoading) {
    return (
      <h1 style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
        LOADER...
      </h1>
    )
  }

  return isAuth ? <Outlet /> : <Navigate to={Routes.SIGN_IN} />
}

// const isAuth = false

function PublicRoutes() {
  const { isAuth, isLoading } = useAppOutletContext()

  if (isLoading) {
    return (
      <h1 style={{ alignSelf: 'center', display: 'flex', justifyContent: 'center' }}>LOADER...</h1>
    )
  }

  return isAuth ? <Navigate to={Routes.DECKS} /> : <Outlet />
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
