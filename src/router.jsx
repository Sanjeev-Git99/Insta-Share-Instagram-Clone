import {createBrowserRouter, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserDetails from './components/UserDetails'
import NotFound from './components/NotFound'

const ProtectedRoute = ({children}) => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace />
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-profile',
    element: (
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <ProtectedRoute>
        <UserDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
])

export default router
