import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/singUp'
import { CheckEmail } from '@/pages/checkEmail'
import { CreateNewPassword } from '@/pages/createNewPassword'
import { ForgotPassword } from '@/pages/forgotPasword'
import PageNotFound from '@/pages/pageNotFound/pageNotFound'

import Layout from '../layout/layout'

const publicRoutes: RouteObject[] = [
  {
    element: (
      <div style={{ marginTop: '36px' }}>
        <ForgotPassword />
      </div>
    ),
    path: '/forgotPassword',
  },
  {
    element: (
      <div style={{ marginTop: '36px' }}>
        <SignIn />
      </div>
    ),
    path: '/signIn',
  },
  {
    element: (
      <div style={{ marginTop: '36px' }}>
        <SignUp />
      </div>
    ),
    path: '/signUp',
  },
  {
    element: (
      <div style={{ marginTop: '36px' }}>
        <CheckEmail email={'@asd'} />
      </div>
    ),
    path: '/checkEmail',
  },
  {
    element: (
      <div style={{ marginTop: '36px' }}>
        <CreateNewPassword />
      </div>
    ),
    path: '/createNewPassword',
  },
]

const privateRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <div style={{ display: 'flex', justifyContent: 'center' }}>main</div>,
        path: '/',
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

const isAuthenticated = false

function PrivateRoutes() {
  return isAuthenticated ? <Outlet /> : <Navigate to={'/signIn'} />
}
