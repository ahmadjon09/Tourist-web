import React, { useEffect } from 'react'
import { Container } from '../../components/shared/Container/Container'
import { DollarSign, Earth, Plane } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
export const StepsSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })
  }, [])
  const steps = [
    {
      icon: <Earth size={50} />,
      title: 'Choose A Destination',
      description:
        'Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit.'
    },
    {
      icon: <DollarSign size={50} />,
      title: 'Pay Online',
      description:
        'Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit.'
    },
    {
      icon: <Plane size={50} />,
      title: 'Fly Today',
      description:
        'Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam eos erat ipsum et lorem et sit sed stet lorem sit.'
    }
  ]

  return (
    <Container>
      <div data-aos='fade-up' className='py-12'>
        <div className='w-full flex justify-center items-center gap-2 p-4'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>Process</p>
          <div className='flex flex-col gap-2'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
          3 Easy Steps
        </p>
        <br />
        <div className='container mx-auto pt-20'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {steps.map((step, index) => (
              <div
                key={index}
                className='flex flex-col relative items-center text-center border border-green-500 rounded-lg p-6 bg-white shadow-md'
              >
                <div className='w-20 absolute -top-14 h-20 flex items-center justify-center bg-[#86b817] text-white rounded-full'>
                  {step.icon}
                </div>
                <h3 className='text-xl font-semibold text-blue-900 mt-4'>
                  {step.title}
                </h3>
                <hr className='w-12 mt-2 border-t-2 border-green-500' />
                <p className='text-gray-600 mt-4'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
