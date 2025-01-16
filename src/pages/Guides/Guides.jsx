import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
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
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import 'aos/dist/aos.css'
const Guides = () => {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <Container>
      <div data-aos='fade-up' className='px-8 max-h-screen h-[700px]'>
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
          <p> loading ...</p>
        ) : isError ? (
          <p className='text-red-500 text-center text-xl'>Error: {isError}</p>
        ) : data.length > 0 ? (
          <div className='h-full w-full pb-10 '>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              spaceBetween={30}
              slidesPerView={4}
              className='w-full h-full'
            >
              {data.map((guide, index) => (
                <SwiperSlide key={index} className='flex justify-center'>
                  <div className='relative text-center bg-white h-[400px] rounded-md shadow-md mx-1'>
                    <div className='w-full  h-[300px] overflow-hidden'>
                      <img
                        src={
                          guide.photos[0] || 'https://via.placeholder.com/150'
                        }
                        alt={`${guide.firstName} ${guide.lastName}`}
                        className='object-cover hover:scale-110 mb-4 transition-all duration-500 h-full w-full rounded-md'
                      />
                    </div>
                    <div className='flex items-center justify-center w-full absolute bottom-[85px] gap-3 left-auto'>
                      <a
                        href={guide.fsblink}
                        className='transition-all duration-300 flex w-[40px] hover:cursor-pointer h-[40px] rounded-full bg-white text-[#86b817] font-bold items-center justify-center border-b-[1px] border-[#86b817] hover:bg-[#86b817] hover:text-white'
                      >
                        <FacebookLogo size={30} />
                      </a>
                      <a
                        href={guide.twtlink}
                        className='transition-all duration-300 flex w-[40px] hover:cursor-pointer h-[40px] rounded-full bg-white text-[#86b817] font-bold items-center justify-center border-b-[1px] border-[#86b817] hover:bg-[#86b817] hover:text-white'
                      >
                        <TwitterLogo size={30} />
                      </a>
                      <a
                        href={guide.inslink}
                        className='transition-all duration-300 flex w-[40px] hover:cursor-pointer h-[40px] rounded-full bg-white text-[#86b817] font-bold items-center justify-center border-b-[1px] border-[#86b817] hover:bg-[#86b817] hover:text-white'
                      >
                        <InstagramLogo size={30} />
                      </a>
                    </div>
                    <br />
                    <h2 className='text-lg font-bold'>
                      {guide.firstName} {guide.lastName}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      {guide.Designation.length > 150
                        ? guide.Designation.slice(0, 150) + ' ...' ||
                          'Designation'
                        : guide.Designation || 'Designation'}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
export default Guides
