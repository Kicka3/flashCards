import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Layout from '../layout/layout'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/signIn',
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
    element: <Layout />,
  },
]

const router = createBrowserRouter([
  { children: privatRoutes, element: <PrivateRoutes /> },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthentificated = true

  return isAuthentificated ? <Outlet /> : <Navigate to={'/signIn'} />
}
