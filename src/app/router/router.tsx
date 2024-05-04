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
import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/singUp'
import { Decks } from '@/pages/decks/decksContainer'
import PageNotFound from '@/pages/pageNotFound/pageNotFound'
import { Cards } from '@/pages/сards'

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
  {
    element: <CheckEmail email={'mail@mail.com'} />,
    path: '/checkEmail',
  },
  {
    element: <CreateNewPassword />,
    path: '/createNewPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
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
    children: [{ children: privateRoutes, element: <PrivateRoutes /> }, { children: publicRoutes }],
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

const isAuthenticated = true

function PrivateRoutes() {
  return isAuthenticated ? <Outlet /> : <Navigate to={'/signIn'} />
}
