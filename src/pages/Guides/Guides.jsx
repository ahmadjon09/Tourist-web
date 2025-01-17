import React, { useEffect } from 'react'
import Slider from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Axios from '../../Axios'
import {
  getGuidesError,
  getGuidesPending,
  getGuidesSuccess
} from '../../toolkit/GuidesSlicer'
import { FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react'
import { Container } from '../../components/shared/Container/Container'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const Guides = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isPending, isError } = useSelector(state => state.guides)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    })

    const getAllGuides = async () => {
      dispatch(getGuidesPending())
      try {
        const response = await Axios.get('guides')
        dispatch(getGuidesSuccess(response.data?.data || []))
      } catch (error) {
        dispatch(
          getGuidesError(error.response?.data?.message || 'Unknown error')
        )
      }
    }

    getAllGuides()
  }, [dispatch])

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Container>
      <div className='px-8 max-h-screen h-auto'>
        <div className='w-full flex justify-center items-center gap-2 p-4'>
          <div className='flex flex-col gap-2 items-end'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
          <p className='uppercase font-bold text-xl text-[#86b817]'>
            Travel Guide
          </p>
          <div className='flex flex-col gap-2'>
            <div className='w-10 h-[2px] bg-[#86b817]'></div>
            <div className='w-20 h-[2px] bg-[#86b817]'></div>
          </div>
        </div>
        <p className='w-full text-center text-blue-950 font-[900] text-5xl'>
          Meet Our Guide
        </p>
        <br />
        <br />
        {isPending ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
        ) : data.length > 0 ? (
          <div className='h-full w-full pb-10'>
            <Slider {...sliderSettings}>
              {data.map((guide, index) => (
                <div
                  key={index}
                  className='relative text-center bg-white rounded-md shadow-md group'
                >
                  <div className='w-full h-[75%] overflow-hidden'>
                    <img
                      src={guide.photos[0] || 'https://via.placeholder.com/150'}
                      alt={`${guide.firstName} ${guide.lastName}`}
                      className='object-cover h-full w-full rounded-md'
                    />
                  </div>
                  <h2 className='text-lg font-bold'>
                    {guide.firstName} {guide.lastName}
                  </h2>
                  <p className='text-sm text-gray-500'>
                    {guide.Designation.length > 150
                      ? guide.Designation.slice(0, 150) + ' ...'
                      : guide.Designation || 'Designation'}
                  </p>
                  <div className='absolute inset-0 flex items-center justify-center p-2 transition-opacity opacity-0 group-hover:opacity-100 bg-black/50 rounded-md'>
                    <div className='flex space-x-4'>
                      <div className='flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full transition-transform transform group-hover:scale-100 scale-75'>
                        <a href={guide.fsblink}>
                          <FacebookLogo size={30} color='#fff' />
                        </a>
                      </div>
                      <div className='flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full transition-transform transform group-hover:scale-100 scale-75'>
                        <a href={guide.twtlink}>
                          <TwitterLogo size={30} color='#fff' />
                        </a>
                      </div>
                      <div className='flex items-center justify-center w-12 h-12 bg-red-500 rounded-full transition-transform transform group-hover:scale-100 scale-75'>
                        <a href={guide.inslink}>
                          <InstagramLogo size={30} color='#fff' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className='text-gray-600 text-center text-lg mt-4'>
            No guides found.
          </p>
        )}
      </div>
    </Container>
  )
}
