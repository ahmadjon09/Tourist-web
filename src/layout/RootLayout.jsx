import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NV } from '../components/shared/Header/NV'
import { Header } from '../components/shared/Header/Header'
import { Footer } from '../components/shared/Footer/Footer'
import { Home2 } from '../pages/Home/Home2'

export const RootLayout = () => {
  const location = useLocation()

  return (
    <>
      <NV />
      <Header />
      {location.pathname === '/' ? null : <Home2 />}
      <Outlet />
      <Footer />
    </>
  )
}
