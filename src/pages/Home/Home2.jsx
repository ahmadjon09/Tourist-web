import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Container } from '../../components/shared/Container/Container'
import { Link, useLocation } from 'react-router-dom'

export const Home2 = () => {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
  }, [])

  const pageData = {
    '/': { title: 'You are on the Home page', breadcrumb: null },
    '/about': { title: 'About Us', breadcrumb: 'About Us' },
    '/services': { title: 'Services', breadcrumb: 'Services' },
    '/gallery': { title: 'Gallery', breadcrumb: 'Gallery' },
    '/contact': { title: 'Contact Us', breadcrumb: 'Contact' },
    '/packages': { title: 'Packages', breadcrumb: 'Packages' },
    '/login': { title: 'Login', breadcrumb: 'Login' },
    '/singup': { title: 'Sing up', breadcrumb: 'Sing up' },
    '/cart': { title: 'Cart', breadcrumb: 'Cart' },
    '/get/:id': { title: 'Package', breadcrumb: 'Package' },
    '/search': { title: 'Search', breadcrumb: 'Search' }
  }

  const currentPage = pageData[location.pathname] || {
    title: 'Page Not Found',
    breadcrumb: null
  }

  return (
    <div className='w-full h-auto'>
      <div className='flex w-full bg-hero bg-cover bg-center relative'>
        <div className='absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70'></div>
        <Container className='w-full h-[700px] z-10 mx-auto'>
          <div
            data-aos='fade-down'
            className='flex flex-col text-white gap-6 w-full h-full items-center justify-center text-center px-6'
          >
            <p
              data-aos='fade-down'
              data-aos-duration='300'
              className='text-4xl md:text-6xl z-10 font-extrabold tracking-wide'
            >
              {currentPage.title}
            </p>

            {currentPage.breadcrumb && (
              <p
                data-aos='fade-down'
                data-aos-duration='301'
                className='text-lg md:text-xl font-medium max-w-[800px]'
              >
                <Link to={'/'} className='text-[#86b817] hover:underline'>
                  Home
                </Link>{' '}
                / {currentPage.breadcrumb}
              </p>
            )}
          </div>
        </Container>
      </div>
    </div>
  )
}
