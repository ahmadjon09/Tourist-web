import React, { useEffect } from 'react'
import { Container } from '../../components/shared/Container/Container'
import aboutImg from '../../data/imgs/about.jpg'
import { MoveRight } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Guides from '../Guides/Guides'

export const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
  }, [])

  return (
    <>
      <Container>
        <div
          data-aos='fade-up'
          className='flex mt-10 flex-col lg:flex-row items-center lg:justify-between gap-10 w-full max-w-7xl mx-auto'
        >
          <div className='w-full lg:w-1/2 h-auto max-h-[500px] overflow-hidden rounded-lg shadow-lg'>
            <img
              src={aboutImg}
              className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
              alt='About us'
            />
          </div>
          <div className='w-full lg:w-1/2 flex flex-col gap-6'>
            <div className='flex items-center gap-5'>
              <p className='uppercase font-bold text-xl text-[#86b817]'>
                About Us
              </p>
              <div className='flex flex-col gap-2'>
                <div className='w-10 h-[2px] bg-[#86b817]'></div>
                <div className='w-20 h-[2px] bg-[#86b817]'></div>
              </div>
            </div>
            <h1 className='text-4xl lg:text-5xl font-bold text-blue-950'>
              Welcome to <span className='text-[#86b817]'>Tourist</span>
            </h1>
            <p className='text-gray-500 leading-relaxed'>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit.
            </p>
            <p className='text-gray-500 leading-relaxed'>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet.
            </p>
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='flex flex-col gap-3 text-gray-500'>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> First Class Flights
                </div>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> 5 Star Accommodations
                </div>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> 150 Premium City Tours
                </div>
              </div>
              <div className='flex flex-col gap-3 text-gray-500'>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> Handpicked Hotels
                </div>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> Latest Model Vehicles
                </div>
                <div className='flex items-center gap-2'>
                  <MoveRight color='#86b817' /> 24/7 Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <br />
      <Guides />
    </>
  )
}
