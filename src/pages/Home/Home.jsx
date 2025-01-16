import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Container } from '../../components/shared/Container/Container'
import { Link, useLocation } from 'react-router-dom'
import { About } from '../About/About'
import { Services } from '../Services/Services'
import { PackagesSale } from '../Products/SalePackages'
import { StepsSection } from '../Step/Steps'

export const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
  }, [])

  return (
    <div className='w-full h-auto'>
      <br />
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
              className='text-4xl md:text-6xl font-extrabold tracking-wide'
            >
              Enjoy Your Vacation With Us
            </p>
            <p
              data-aos='fade-down'
              data-aos-duration='301'
              className='text-lg z-10 md:text-xl font-medium max-w-[800px]'
            >
              Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum
              lorem sit
            </p>
            <div
              data-aos='fade-down'
              data-aos-duration='302'
              className='relative w-full max-w-[650px]'
            >
              <input
                className='w-full h-[55px] rounded-full px-5 text-gray-900 outline-none border border-gray-300 focus:border-[#86b817] transition-all duration-300'
                type='text'
                name='search'
                placeholder='Eg: Uzbekistan'
              />
              <Link
                to={'/search'}
                className='absolute top-1/2 -translate-y-1/2 right-3 bg-[#86b817] text-white rounded-full py-2 px-6 transition-all duration-300 hover:bg-[#85b817cc]'
              >
                Search
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <About />
      <Services />
      <PackagesSale />
      <StepsSection />
    </div>
  )
}
