import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

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
    path: '/forgotPassword',
  },
  {
    element: <SignIn />,
    path: '/signIn',
  },
  {
    element: <SignUp />,
    path: '/signUp',
  },
  /* поправить email */
  {
    element: <CheckEmail email={'mail@mail.com'} />,
    path: '/checkEmail',
  },
  { element: <ProfilePage />, path: '/profile' },
  {
    element: <CreateNewPassword />,
    path: '/createNewPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <Navigate to={'/decks'} />,
        path: '/',
      },
      {
        element: <Cards />,
        path: '/decks/:id',
      },
      {
        element: <Decks />,
        path: '/decks',
      },
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

const isAuth = true

function PrivateRoutes() {
  return isAuth ? <Outlet /> : <Navigate replace to={'/signIn'} />
}

function PublicRoutes() {
  return isAuth ? <Navigate replace to={'/decks'} /> : <Outlet />
}
