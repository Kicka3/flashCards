import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { SignIn } from '@/pages/auth/signIn'
import { SignUp } from '@/pages/auth/singUp'
import PageNotFound from '@/pages/pageNotFound/pageNotFound'

import Layout from '../layout/layout'

const publicRoutes: RouteObject[] = [
  {
    children: [
      {
        element: <SignIn />,
        path: '/signIn',
      },
      {
        element: <SignUp />,
        path: '/signUp',
      },
    ],
  },
]

const privatRoutes: RouteObject[] = [
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
    children: [{ children: privatRoutes, element: <PrivateRoutes /> }, { children: publicRoutes }],
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

const isAuthentificated = false

function PrivateRoutes() {
  return isAuthentificated ? <Outlet /> : <Navigate to={'/signIn'} />
}
// function PublicRoutes() {
//   return isAuthentificated ? <Navigate to={'/'} /> : <Outlet />
// }
