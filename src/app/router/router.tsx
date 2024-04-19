import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

const publicRoutes: RouteObject[] = [
  {
    element: <div>login</div>,
    path: '/signIn',
  },
]

const privatRoutes: RouteObject[] = [
  {
    element: <div>main</div>,
    path: '/',
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
