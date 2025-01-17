import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { Cart } from './pages/Cart/Cart'
import { Home } from './pages/Home/Home'
import { Gallery } from './pages/Gallery/Gallery'
import { About } from './pages/About/About'
import { Services } from './pages/Services/Services'
import { Login } from './pages/Login/Login'
import { SingUp } from './pages/Login/SingUp'
import Axios from './Axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserError,
  getUserPending,
  getUserSuccess
} from './toolkit/UserSlicer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { PackagesSale } from './pages/Products/SalePackages'
import { Contact } from './pages/Contact/Contact'
import { PackageDetails } from './pages/Products/GetOne'
import { SearchPage } from './pages/Search/Search'

function App () {
  const dispatch = useDispatch()
  const { isPending } = useSelector(state => state.user)

  const isAuth = localStorage.getItem('isAuth') === 'true'

  useEffect(() => {
    if (isAuth) {
      const fetchUserData = async () => {
        dispatch(getUserPending())
        try {
          const response = await Axios.get('client/me')
          if (response.data) {
            dispatch(getUserSuccess(response.data))
          } else {
            dispatch(getUserError('No user data available'))
          }
        } catch (error) {
          dispatch(getUserError(error.response?.data || 'Unknown Token'))
        }
      }
      fetchUserData()
    }
  }, [dispatch, isAuth])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'login', element: <Login /> },
        { path: 'singup', element: <SingUp /> },
        { path: 'about', element: <About /> },
        { path: 'services', element: <Services /> },
        { path: 'packages', element: <PackagesSale /> },
        { path: 'contact', element: <Contact /> },
        { path: 'gallery', element: <Gallery /> },
        { path: 'get/:id', element: <PackageDetails /> },
        { path: 'search', element: <SearchPage /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
